<script>
  import { slide } from "svelte/transition";

  export let user;
  export let apiCall;

  let originalUserData = { ...user };
  let loading = false;
  $: changed = JSON.stringify(user) === JSON.stringify(originalUserData);

  let showVerifyEmail = false;

  let verificationCode;
  async function updateAccount(e) {
    try {
      e.preventDefault();
      showVerifyEmail = true;
      const call = await apiCall("/updateUser", JSON.stringify({ user: user }));
      console.log("CALL", call);
      if (call.error) {
        if (call.message == "AccountExists") {
          alert("Ett konto med din mailen finns redan");
        } else {
          console.log("call", call);
          alert("Något gick fel, försök igen senare");
        }
      } else {
        if (call.message === "VerifyEmail") {
          verifyEmail = true;
        } else {
          user = call.user;
          originalUserData = { ...user };
        }
      }
      loading = false;
    } catch (err) {
      console.log("Err", err);
      alert("Något gick fel, försök igen senare");
      loading = false;
    }
  }
  async function verifyEmail(e) {
    try {
      const call = await apiCall(
        "/verifyUpdateEmail",
        JSON.stringify({ verificationCode: verificationCode })
      );
      if (call.error) {
        if (call.message === "WrongCode") {
          alert("Du har skrivit in fel kod");
        } else {
          alert("Något gick fel");
        }
      } else {
        alert("Ditt konot har uppdaterats");
        user = call.user;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<form class="m-2" on:submit={updateAccount}>

  <div class="form-group">
    <label for="exampleInputPassword1">Ditt namn</label>
    <input
      type="text"
      class="form-control"
      id="exampleInputPassword1"
      placeholder="Namn"
      bind:value={user.name} />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Din email address</label>
    <input
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder="Email"
      bind:value={user.email} />
  </div>

  <button type="submit" class="btn btn-success" disabled={changed}>
    Uppdatera
  </button>
  {#if loading}
    <div transition:slide class="m-3">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  {/if}
</form>
{#if showVerifyEmail}
  <div class="m-2" transition:slide>
    <form
      on:submit={e => {
        e.preventDefault();
        alert(verifyEmail);
        verifyEmail();
      }}>
      <div class="form-group ">
        <label for="verificationCodeInput">Verifikations kod</label>
        <input
          bind:value={verificationCode}
          type="text"
          class="form-control"
          id="verificationCodeInput"
          aria-describedby="emailHelp"
          placeholder="Skriv in din verifikations kod" />
        <small id="emailHelp" class="form-text text-muted">
          Ett epost meddelande med en kod har skickats till {user.email}
        </small>
      </div>
      <button type="submit" class="btn btn-success">
        Verifiera email byte
      </button>
    </form>
  </div>
{/if}
