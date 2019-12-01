<script>
  import { slide } from "svelte/transition";
  import ExpandedOrder from "./ExpandedOrder.svelte";

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
  #expandedContent {
  }
</style>

{#if expanded}

  <tr style="cursor:initial">
    <td id="expandedContent" colspan="7" transition:slide>
      <ExpandedOrder {order} />
    </td>
  </tr>
{:else}
  <tr on:click={expand}>
    <th class="align-middle" scope="row">{order.number}</th>
    <td class="align-middle">{order.productName}</td>
    <td class="align-middle d-none d-sm-table-cell">{order.customer.name}</td>
    <td class="align-middle d-none d-md-table-cell">
      {order.responsible.name}
    </td>
    <td class="align-middle">{order.status}</td>
    <td class="align-middle">{new Date(order.date).toDateString()}</td>
    <td>
      <button class="btn btn-danger">Delete order</button>
    </td>
  </tr>
  <!--   {#if false}
    <tr on:click={expand} class="expand" transition:slide>
      <th transition:slide class="align-middle" scope="row">{order.number}</th>
      <td transition:slide class="align-middle">{order.productName}</td>
      <td transition:slide class="align-middle d-none d-sm-table-cell">
        {order.customer}
      </td>
      <td transition:slide class="align-middle d-none d-md-table-cell">
        {order.responsible}
      </td>
      <td transition:slide class="align-middle ">{order.status}</td>
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
    <td transition:slide class="align-middle">{order.}</td>
    <td transition:slide />
  </tr> -->
{/if}
