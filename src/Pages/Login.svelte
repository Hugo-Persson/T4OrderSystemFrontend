<script>
  import { slide } from "svelte/transition";

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
        console.log("huhhhhh");
        register = true;
        headerText = "Register";
      } else if (!call.error) {
        console.log("Login no error");
        headerText = "Verify login";
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
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  main {
    text-align: center;
  }
</style>

<main>
  <header>
    <h1>{headerText}</h1>
  </header>
  <span>{feedbackInformation}</span>

  {#if verify}
    <form action="" on:submit={verifyRegistration}>
      <input
        type="text"
        name="verificationCode"
        id="verificationCode"
        bind:value={verificationCode}
        placeholder="Verification code" />
      <input type="submit" value="Finish" />
    </form>
  {:else if loading}
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  {:else}
    <!-- else content here -->

    <form action="" on:submit={login}>
      {#if register}
        <br />
        <div transition:slide>
          <input
            type="text"
            name="Name"
            id="Name"
            bind:value={name}
            placeholder="Your name" />
        </div>
      {/if}
      <input
        type="email"
        name="email"
        bind:value={email}
        id="enterEmail"
        placeholder="E-Mail" />

      <br />
      <input type="submit" value="Proceed" />

    </form>
  {/if}

</main>
