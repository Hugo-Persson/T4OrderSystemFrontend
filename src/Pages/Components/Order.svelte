<script>
  export let order;
</script>

<style>
  .row div {
    border: 1px solid gray;
    padding: 0.5rem;
    cursor: pointer;
  }
  .row div:hover {
  }
  .row:nth-child(odd) {
  }
  .row:nth-child(even) {
  }
</style>

<div class="row">
  <div class="col-1">{order.number}</div>
  <div class="col-4">{order.name}</div>
  <div class="col-3">{order.from}</div>
  <div class="col-2">{order.status}</div>

  <div class="col-2">

    <button type="button" class="btn btn-danger">Delte order</button>
  </div>
</div>
