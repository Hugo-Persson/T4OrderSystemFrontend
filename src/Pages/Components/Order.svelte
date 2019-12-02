<script>
  /* global $ */
  import { slide } from "svelte/transition";
  import ExpandedOrder from "./ExpandedOrder.svelte";

  export let order;
  export let apiCall;
  export let getAllOrders;
  let expanded = false;
  let deleteOrderError;
  function toggleExpand() {
    expanded = !expanded;
  }
  async function deleteOrder() {
    console.log("delete");
    console.log(deleteOrderError);

    try {
      const call = await apiCall(
        "/deleteOrder",
        JSON.stringify({ id: order._id })
      );
      console.log(call);
      if (call.error) {
        // TODO:Error handeling
      } else {
        console.log("success");
        getAllOrders();
      }
    } catch (err) {
      console.log(err);
    }
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
      <ExpandedOrder {deleteOrder} {order} {toggleExpand} />
    </td>
  </tr>
{:else}
  <tr>
    <th on:click={toggleExpand} class="align-middle" scope="row">
      {order.number}
    </th>
    <td on:click={toggleExpand} class="align-middle">{order.productName}</td>
    <td on:click={toggleExpand} class="align-middle d-none d-sm-table-cell">
      {order.customer.name}
    </td>
    <td on:click={toggleExpand} class="align-middle d-none d-md-table-cell">
      {order.responsible.name}
    </td>
    <td on:click={toggleExpand} class="align-middle">{order.status}</td>
    <td on:click={toggleExpand} class="align-middle d-none d-md-table-cell">
      {new Date(order.date).toDateString()}
    </td>
    <td>
      <button class="btn btn-danger float-right" on:click={deleteOrder}>
        Radera order
      </button>
    </td>
  </tr>
{/if}
