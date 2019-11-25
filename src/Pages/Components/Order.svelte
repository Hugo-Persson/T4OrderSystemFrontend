<script>
  export let order;
  let expanded = false;
  function expand() {
    expanded = true;
  }
</script>

<style>
  tr {
    cursor: pointer;
  }
</style>

{#if expanded}
  expanded order
{:else}
  <tr on:click={expand}>
    <th class="align-middle" scope="row">{order.number}</th>
    <td class="align-middle">{order.name}</td>
    <td class="align-middle d-none d-sm-table-cell">{order.customer}</td>
    <td class="align-middle">{order.status}</td>
    <td>
      <button class="btn btn-danger">Delete order</button>
    </td>
  </tr>
{/if}
