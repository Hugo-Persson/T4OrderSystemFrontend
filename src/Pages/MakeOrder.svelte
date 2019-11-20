<script>
  import { navigate } from "svelte-routing";
  export let apiCall;
  export let checkUser;
  let user;
  let loading = true;
  checkRoute();
  async function checkRoute() {
    try {
      const user = await apiCall("/checkAccount");
      const path = checkUser(user);

      console.log(user);
      if (path !== "/makeOrder") {
        navigate(path);
      }
      loading = false;
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  main {
  }
  form {
    width: 80%;
    margin: auto;
    margin-top: 20px;
  }
</style>

{#if loading}
  Loading...
{:else}
  <main>
    <form>
      <h3>Typ av uppdrag</h3>
      <div class="form-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1" />
          <label class="form-check-label" for="defaultCheck1">
            Tillverkning
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1" />
          <label class="form-check-label" for="defaultCheck1">
            Tillverkningsunderlag
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1" />
          <label class="form-check-label" for="defaultCheck1">Beräkning</label>
        </div>
      </div>

      <div class="form-group">
        <h3>Beskrivning av produkt</h3>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3" />
      </div>

      <div class="form-group">
        <h3>Önskemål</h3>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3" />
      </div>
      <h3>Files</h3>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </main>
{/if}
