<script>
  import { slide, fade } from "svelte/transition";
  import { url, params } from "../Router";
  export let apiCall;

  let email;
  let name;
  let register = false;
  let headerText = "Logga in/Registera";
  let fetch;
  let verify = false;
  let verificationCode;
  let loading;
  let progress = "0%";

  let alertText = "";
  let error = false;

  let feedbackInformation = "";
  async function login(e) {
    e.preventDefault();

    console.log(register);
    if (register) {
      registerUser(e);
      return;
    }

    try {
      loading = true;
      const call = await apiCall("/login", JSON.stringify({ email: email }));

      if (call.error) {
        if (call.message === "NoAccount") {
          progress = "33%";
          register = true;
          loading = false;
          headerText = "Registera";
        } else if (call.message === "NotActive") {
          error = true;
          alertText =
            "Kontot är inaktivt, kontakta en admin för att göra det aktivt igen";
          loading = false;
        }
      } else {
        loading = false;
        console.log("Login no error");
        headerText = "Verifiera inloggning";
        progress = "50%";

        feedbackInformation =
          "Ett mail har skickats med verifikations koden till " + email;
        verify = true;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function registerUser(e) {
    e.preventDefault();
    try {
      loading = true;
      const call = await apiCall(
        "/registerUser",
        JSON.stringify({ name: name, email: email })
      );
      loading = false;

      if (!call.error) {
        progress = "66%";
        verify = true;
        headerText = "Verifiera konto";
        feedbackInformation =
          "Ett mail har skickats med verifikations koden till " + email;
      } else {
        if (call.message == "AccountExists") {
          error = true;
          alertText = "Konto med den epost adressen finns redan";
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function verifyWithCode(e) {
    try {
      console.log("code");
      e.preventDefault();
      const call = await apiCall(
        "/verifyWithCode",
        JSON.stringify({
          verificationCode: verificationCode
        })
      );
      console.log("CALL: ", call);
      if (call.error) {
        if (call.message === "WrongCode") {
          error = true;
          alertText = "Fel verifikations kod, försök igen";
        } else if (call.message == "NoToken") {
          alert("Verifikations sessionen har gått ut, sidan kommer laddas om");
          location.reload();
        } else if (call.message == "TooManyWrongs") {
          alert(
            "Du har skrivit in fel kod för många gånger, sidan kommer laddas om och du får logga in på nytt"
          );
          location.reload();
        }
      } else {
        //authed
        params.set({ user: call.user });
        if (call.user.admin) {
          url.set("allOrders");
        } else {
          url.set("makeOrder");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  main {
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 3% 0 3% 0;
    position: absolute;
  }
  #login {
    padding: 1%;
    margin: auto;
    height: 55vh;
    background-color: white;
    display: inline-block;
    border-radius: 8px;
    position: relative;
  }

  @media (min-width: 576px) {
    #login {
      width: 95%;
    }
  }

  @media (min-width: 768px) {
    #login {
      width: 60%;
    }
  }

  @media (min-width: 1350px) {
    #login {
      width: 30%;
    }
  }

  #progressContainer {
    position: absolute;
    bottom: 10px;
    width: 92%;
  }
  .spinner-border {
    margin: 10px;
  }
  .progress {
    position: initial;
  }
  .alert {
    top: 0px;
    position: absolute;
    width: 100%;
  }
</style>

<main class={progress === '100%' ? 'bg-success' : 'bg-primary'}>
  {#if error}
    <div class="alert alert-danger" transition:slide role="alert">
      {alertText}
    </div>
  {/if}
  <div id="login">
    <header>
      <h1>{headerText}</h1>
    </header>

    {#if verify}
      <form transition:slide on:submit={verifyWithCode}>
        <div class="form-group">
          <label for="verficationCode">Verifikation kod</label>
          <input
            autocomplete="off"
            bind:value={verificationCode}
            type="text"
            class="form-control"
            id="verficationCode"
            aria-describedby="emailHelp"
            placeholder="Skriv in verifikations kod" />
          <small id="emailHelp" class="form-text text-muted">
            {feedbackInformation}
          </small>
        </div>

        <button type="submit" class="btn btn-primary">Vidare</button>
      </form>
    {:else}
      <form transition:slide on:submit={login}>
        <div class="form-group">
          {#if headerText === 'Registera'}
            <div class="form-group">
              <label for="exampleInputPassword1">Name</label>
              <input
                bind:value={name}
                type="text"
                class="form-control"
                id="nameInput"
                placeholder="Ditt name" />
            </div>
          {/if}
          <label for="exampleInputEmail1">Email address</label>
          <input
            bind:value={email}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Din email" />

        </div>

        <button type="submit" class="btn btn-primary">Vidare</button>
      </form>
    {/if}

    <div id="progressContainer">
      {#if loading}
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      {/if}
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style={'width:' + progress}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100">
          {progress}
        </div>
      </div>
    </div>

  </div>

</main>
