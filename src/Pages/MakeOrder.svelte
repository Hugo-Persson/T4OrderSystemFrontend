<script>
  import { slide, fade } from "svelte/transition";
  import AddFile from "./Components/AddFile.svelte";
  import UserNavBar from "./Components/UserNavBar.svelte";

  export let apiCall;
  export let user;
  let files = [];
  let fileDescriptions = [];

  let success = false;
  let error = false;
  let alertText = "";
  init();
  async function init() {
    if (!user) {
      user = await apiCall("/checkAccount");
    }
  }

  function addFile(e) {
    e.preventDefault();
    console.log("add file");
    fileDescriptions = [...fileDescriptions, ""];
    console.log(fileDescriptions);
    console.log(files);
  }
  async function submitForm(e) {
    e.preventDefault();
    const form = e.currentTarget;
    console.log("form", form);
    const formData = new FormData(form);
    files.map(file => formData.append("files", file));
    formData.append("fileDescriptions", fileDescriptions);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const call = await apiCall("/makeOrder", formData, "multipart/form-data");
    if (call.error) {
      error = true;
      alertText = "Kunde inte skapa beställning, försök igen senare";
    } else {
      success = true;
      alertText = "Beställning skapad";
      form.reset();
      files = [];
      fileDescriptions = [];
    }
  }
  function deleteFileInput(removeIndex) {
    console.log("fileDesc1", fileDescriptions);

    files = files.filter((value, index) => index !== removeIndex);
    fileDescriptions = fileDescriptions.filter(
      (value, index) => index !== removeIndex
    );
    console.log("fileDesc", fileDescriptions);
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

<header>
  <UserNavBar {apiCall} />
</header>
<div class="container-fluid">

  <main>

    {#if error || success}
      <div
        class="alert {error ? 'alert-danger' : 'alert-success'}
        "
        in:slide
        role="alert">
        {alertText}
      </div>
    {/if}

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
          <div class="col">
            <label for="customer">Beställare</label>
            <input
              name="customer"
              type="text"
              id="customer"
              class="form-control"
              value={user.name}
              placeholder="Beställare" />
          </div>
        </div>

        <div class="form-group mt-3">
          <h3>Typ av uppdrag</h3>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="tillverkning"
              name="production" />
            <label class="form-check-label" for="tillverkning">
              Tillverkning
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
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
        <h3>Filer</h3>

        {#each fileDescriptions as desc, i}
          <AddFile
            {deleteFileInput}
            index={i}
            {files}
            descriptions={fileDescriptions} />
        {/each}

        <button class="btn btn-primary" on:click={addFile}>
          Lägg till fil
        </button>

        <hr class="my-4" />
        <button type="submit" class="btn btn-success btn-lg">
          Gör beställning
        </button>
      </div>
    </form>
  </main>
</div>
