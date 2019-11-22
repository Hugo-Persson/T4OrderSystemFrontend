<script>
  import { navigate } from "svelte-routing";
  import AddFile from "./Components/AddFile.svelte";
  export let apiCall;
  export let checkUser;
  let user;
  let loading = true;
  let files = [];

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
  function addFile(e) {
    e.preventDefault();
    console.log("add file");
    files = [...files, {}];
    console.log(files);
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
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Product name" />
      </div>
      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Orderer" />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Responsible" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <h3>Typ av uppdrag</h3>
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

      {#each files as file}
        <AddFile fileObj={file} />
      {/each}

      <button class="btn btn-primary" on:click={addFile}>Add file</button>

      <hr class="my-4" />
      <button type="submit" class="btn btn-success btn-lg">Make order</button>
    </form>
  </main>
{/if}
