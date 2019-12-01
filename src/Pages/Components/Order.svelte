<script>
  import { slide } from "svelte/transition";
  import ExpandedOrder from "./ExpandedOrder.svelte";

  export let order;
  let expanded = false;
  function toggleExpand() {
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
    <td id="expandedContent" colspan="7">
      <ExpandedOrder {order} {toggleExpand} />
    </td>
  </tr>
{:else}
  <tr on:click={toggleExpand}>
    <th class="align-middle" scope="row">{order.number}</th>
    <td class="align-middle">{order.productName}</td>
    <td class="align-middle d-none d-sm-table-cell">{order.customer.name}</td>
    <td class="align-middle d-none d-md-table-cell">
      {order.responsible.name}
    </td>
    <td class="align-middle">{order.status}</td>
    <td class="align-middle d-none d-md-table-cell">
      {new Date(order.date).toDateString()}
    </td>
    <td>
      <button class="btn btn-danger float-right">Radera order</button>
    </td>
  </tr>
{/if}
