<script>
  export let files;
  export let descriptions;
  export let index;
  import { slide, fade } from "svelte/transition";
  export let deleteFileInput;
  console.log(files);

  function deleteFile() {
    deleteFileInput(index);
  }
</script>

<div transition:slide class="form-group">
  <div class="form-row">
    <div class="col-4">
      <input
        type="file"
        class="custom-file-input"
        id={index}
        aria-describedby="inputGroupFileAddon01"
        multiple={false}
        on:change={e => (files[index] = e.currentTarget.files[0])} />
      <label
        class="custom-file-label text-truncate"
        data-browse="Ladda upp"
        for={index}>
        {#if files[index] === undefined}Välj fil{:else}{files[index].name}{/if}
      </label>
    </div>
    <div class="col-7">
      <input
        type="text"
        class="form-control"
        bind:value={descriptions[index]}
        placeholder="Fil information" />
    </div>
    <button
      on:click={deleteFile}
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>
