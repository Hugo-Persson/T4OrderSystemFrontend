<script>
  import { slide, fade } from "svelte/transition";

  export let apiCall;

  let email;
  let name;
  let register = false;
  let headerText = "Login/Register";
  let fetch;
  let verify = false;
  let verificationCode;
  let loading;
  let verificationToken;
  let progress = "0%";

  let feedbackInformation = "";
  async function getOneTimeCode(e) {}
  async function login(e) {
    e.preventDefault();

    console.log(register);
    if (register) {
      registerUser(e);
      console.log("wrong");
      return;
    }

    try {
      console.log("yyyyy");

      const call = await apiCall("/login", { email: email });

      if (call.message === "NoAccount") {
        progress = "33%";
        register = true;
        headerText = "Register";
      } else if (!call.error) {
        console.log("Login no error");
        headerText = "Verify login";

        progress = "50%";

        feedbackInformation =
          "An email with the verification code have been sent to " + email;
        verify = true;
      } else {
        console.log("huh");
      }
      console.log(call);
    } catch (err) {
      console.log(err);
    }
  }
  async function registerUser(e) {
    e.preventDefault();
    try {
      const call = await apiCall("/registerUser", { name: name, email: email });
      if (!call.error) {
        progress = "66%";
        verify = true;
        verificationToken = call.data.token;
        console.log(verificationToken);
        headerText = "Verify account";
        feedbackInformation =
          "An email with the verification code have been sent to " + email;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function verifyRegistration(e) {
    e.preventDefault();
    console.log(verificationToken);
    try {
      const call = await apiCall("/verifyRegistration", {
        token: verificationToken,
        verificationCode: verificationCode
      });
      feedbackInformation = call.message;
      if (!call.error) {
        progress = "100%";
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
    width: 30%;
    margin: auto;
    height: 55vh;
    background-color: white;
    display: inline-block;
    border-radius: 8px;
    position: relative;
  }
  #progressContainer {
    position: absolute;
    bottom: 10px;
    width: 92%;
  }
  .progress {
    position: initial;
  }
</style>

<main class={progress === '100%' ? 'bg-success' : 'bg-primary'}>
  <div id="login">
    <header>
      <h1>{headerText}</h1>
    </header>

    {#if verify}
      <form transition:slide on:submit={verifyRegistration}>
        <div class="form-group">
          <label for="verficationCode">Verification code</label>
          <input
            bind:value={verificationCode}
            type="text"
            class="form-control"
            id="verficationCode"
            aria-describedby="emailHelp"
            placeholder="Enter verification code" />
          <small id="emailHelp" class="form-text text-muted">
            {feedbackInformation}
          </small>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    {:else if loading}
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    {:else}
      <!-- Input before registration  -->
      <form transition:slide on:submit={login}>
        <div class="form-group">
          {#if register}
            <div class="form-group" in:slide>
              <label for="exampleInputPassword1">Your name</label>
              <input
                bind:value={name}
                type="text"
                class="form-control"
                id="nameInput"
                placeholder="Your name" />
            </div>
          {/if}
          <label for="exampleInputEmail1">Email address</label>
          <input
            bind:value={email}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email" />

        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    {/if}
    <div id="progressContainer">
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
