<script>
  import { slide } from "svelte/transition";

  export let user;
  export let apiCall;

  let originalUserData = { ...user };
  let loading = false;
  $: changed = JSON.stringify(user) === JSON.stringify(originalUserData);

  async function updateAccount(e) {
    try {
      e.preventDefault();
      loading = true;
      const call = await apiCall(
        "/updateAccount",
        JSON.stringify({ user: user })
      );
      if (call.error) {
        if (call.message == "AccountExists") {
          alert("Ett konto med din mailen finns redan");
        } else {
          console.log("call", call);
          alert("Något gick fel, försök igen senare");
        }
      } else {
        user = call.user;
        originalUserData = { ...user };
      }
      loading = false;
    } catch (err) {
      console.log("Err", err);
      alert("Något gick fel, försök igen senare");
      loading = false;
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
