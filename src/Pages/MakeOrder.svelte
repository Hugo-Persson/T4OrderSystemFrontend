<script>
  import { navigate } from "svelte-routing";

  import AddFile from "./Components/AddFile.svelte";
  export let apiCall;
  export let checkUser;
  let user;
  let loading = true;
  let files = [];
  let fileDescriptions = [];

  checkRoute();
  async function checkRoute() {
    try {
      user = await apiCall("/checkAccount");
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
    fileDescriptions = [...fileDescriptions, undefined];
    console.log(fileDescriptions);
    console.log(files);
  }
  function submitForm(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);
    files.map(file => formData.append("files", file));
    formData.append("fileDescriptions", fileDescriptions);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const order = apiCall("/makeOrder", formData, "multipart/form-data");
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
    <form on:submit={submitForm}>

      <div class="form-group">
        <div class="form-row">

          <div class="col">
            <label for="productName">Projektnamn</label>
            <input
              type="text"
              class="form-control"
              id="productName"
              name="productName"
              aria-describedby="emailHelp"
              placeholder="Projektnamn" />
          </div>
          <!-- <div class="col">
            <label for="orderer"></label>
            <input
              name="customer"
              type="text"
              id="orderer"
              class="form-control"
              placeholder="Orderer" />
          </div> -->
        </div>

        <div class="form-group mt-3">
          <h3>Typ av uppdrag</h3>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="tillverkning"
              name="producation" />
            <label class="form-check-label" for="tillverkning">
              Tillverkning
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="tillverkningsunderlag"
              name="productionDocumentation" />
            <label class="form-check-label" for="tillverkningsunderlag">
              Tillverkningsunderlag
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="beräkning"
              name="calculation" />
            <label class="form-check-label" for="beräkning">Beräkning</label>
          </div>
        </div>

        <div class="form-group">
          <h3>Beskrivning av produkt</h3>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="productDescription" />
        </div>

        <div class="form-group">
          <h3>Önskemål</h3>
          <textarea
            class="form-control"
            id="productDescripion"
            name="wishes"
            rows="3" />
        </div>
        <h3>Files</h3>

        {#each fileDescriptions as desc, i}
          <AddFile index={i} {files} descriptions={fileDescriptions} />
        {/each}

        <button class="btn btn-primary" on:click={addFile}>Add file</button>

        <hr class="my-4" />
        <button type="submit" class="btn btn-success btn-lg">Make order</button>
      </div>
    </form>
  </main>
{/if}
