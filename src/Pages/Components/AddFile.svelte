<script>
  export let fileObj;
</script>

<div class="form-group">
  <div class="form-row">
    <div class="col-3">
      <input
        type="file"
        class="custom-file-input"
        id="inputGroupFile01"
        aria-describedby="inputGroupFileAddon01"
        multiple={false}
        bind:files={fileObj.file} />
      <label class="custom-file-label" for="inputGroupFile01">
        {#if fileObj.file === undefined}
          Choose file
        {:else}{fileObj.file[0].name}{/if}
      </label>
    </div>
    <div class="col-9">
      <input
        type="text"
        class="form-control"
        bind:value={fileObj.description}
        placeholder="File description" />
    </div>
  </div>
</div>
