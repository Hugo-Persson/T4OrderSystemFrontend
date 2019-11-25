<script>
  import { slide } from "svelte/transition";

  export let order;
  let expanded = false;
  function expand() {
    expanded = !expanded;
  }
</script>

<style>
  tr {
    cursor: pointer;
  }
  .card {
    display: inline-block;
  }
</style>

{#if expanded}

  <tr style="cursor:initial">
    <td colspan="6" transition:slide>
      <div class="card">
        <div class="card-header">Beställare</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">Ansvarig</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-header">Orderdetaljer</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    </td>
  </tr>
{:else}
  <tr on:click={expand}>
    <th class="align-middle" scope="row">{order.number}</th>
    <td class="align-middle">{order.name}</td>
    <td class="align-middle d-none d-sm-table-cell">{order.customer}</td>
    <td class="align-middle d-none d-md-table-cell">{order.responsible}</td>
    <td class="align-middle">{order.status}</td>
    <td>
      <button class="btn btn-danger">Delete order</button>
    </td>
  </tr>
  {#if false}
    <tr on:click={expand} class="expand" transition:slide>
      <th transition:slide class="align-middle" scope="row">{order.number}</th>
      <td transition:slide class="align-middle">{order.name}</td>
      <td transition:slide class="align-middle d-none d-sm-table-cell">
        {order.customer}
      </td>
      <td transition:slide class="align-middle d-none d-md-table-cell">
        {order.responsible}
      </td>
      <td transition:slide class="align-middle">{order.status}</td>
      <td>
        <button class="btn btn-danger">Delete order</button>
      </td>
    </tr>
  {/if}
{/if}
{#if false}
  <tr on:click={expand} class="bg-secondary text-white">
    <th transition:slide rowspan="2" class="align-middle" scope="row">
      {order.number}
    </th>
    <td transition:slide class="align-middle">{order.name}</td>
    <td transition:slide class="align-middle">{order.customer}</td>
    <td transition:slide class="align-middle d-none d-md-table-cell">
      {order.responsible}
    </td>
    <td transition:slide class="align-middle">{order.status}</td>
    <td transition:slide />
  </tr>
  <tr on:click={expand} class="bg-dark text-white">
    <td transition:slide class="align-middle">{order.name}</td>
    <td transition:slide class="align-middle">{order.customer}</td>
    <td transition:slide class="align-middle d-none d-md-table-cell">
      {order.responsible}
    </td>
    <td transition:slide class="align-middle">{order.status}</td>
    <td transition:slide />
  </tr>
{/if}
