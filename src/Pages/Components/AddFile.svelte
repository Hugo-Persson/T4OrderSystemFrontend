<script>
  export let files;
  export let descriptions;
  export let index;
  import { slide, fade } from "svelte/transition";
  console.log(files);
</script>

<div transition:slide class="form-group">
  <div class="form-row">
    <div class="col-3">
      <input
        type="file"
        class="custom-file-input"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
        multiple={false}
        on:change={e => (files[index] = e.currentTarget.files[0])} />
      <label class="custom-file-label" for="inputGroupFile01">
        {#if files[index] === undefined}
          Choose file
        {:else}{files[index].name}{/if}
      </label>
    </div>
    <div class="col-9">
      <input
        type="text"
        class="form-control"
        bind:value={descriptions[index]}
        placeholder="File description" />
    </div>
  </div>
</div>
