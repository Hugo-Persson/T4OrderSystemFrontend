<script>
  /* global $ */
  import { slide } from "svelte/transition";
  import { url, params } from "../../Router.js";

  import ExpandedOrder from "../ExpandedOrder.svelte";

  let tr;

  export let deleteOrder;
  export let order;
  export let apiCall;
  export let getAllOrders;
  let expanded = false;
  let deleteOrderError;
  function expandOrder() {
    params.set({ order: order });
    url.set("expandedOrder");
  }
</script>

<style>
  tr {
    cursor: pointer;
  }
</style>

{#if expanded}
  <tr style="cursor:initial">
    <td id="expandedContent" colspan="7">

      <ExpandedOrder {deleteOrder} {order} {expandOrder} {deleteOrder} />
    </td>
  </tr>
{:else}
  <tr bind:this={tr}>
    <th on:click={expandOrder} class="align-middle" scope="row">
      {order.productNumber}
    </th>
    <td on:click={expandOrder} class="align-middle">{order.productName}</td>
    <td on:click={expandOrder} class="align-middle d-none d-sm-table-cell">
      {order.customer.name}
    </td>
    <td on:click={expandOrder} class="align-middle d-none d-md-table-cell">
      {order.responsible.name}
    </td>
    <td on:click={expandOrder} class="align-middle">{order.status}</td>
    <td on:click={expandOrder} class="align-middle d-none d-md-table-cell">
      {new Date(order.date).toDateString()}
    </td>
    <td>
      <button
        class="btn btn-danger float-right"
        on:click={() => deleteOrder(order._id)}>
        Radera order
      </button>
    </td>
  </tr>
{/if}
