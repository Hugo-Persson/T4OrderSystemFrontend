<script>
  import Order from "./Components/Order.svelte";
  import { url } from "../Router.js";
  import AdminPanelNav from "./Components/AdminPanelNav.svelte";
  export let apiCall;
  export let getAllOrders;
  export let deleteOrder;
  let searchQuery = "";

  export let allOrders = [];
  $: showOrders = allOrders;

  function filter(e) {
    if (e) e.preventDefault();
    showOrders = allOrders.filter(
      order =>
        order.productNumber == searchQuery ||
        searchProperty(order.productName) ||
        searchProperty(order.responsible.name) ||
        searchProperty(order.responsible.email) ||
        searchProperty(order.customer.name) ||
        searchProperty(order.customer.email) ||
        searchProperty(order.status)
    );
  }
  function searchProperty(prop) {
    return prop.toLowerCase().search(searchQuery.toLocaleLowerCase()) > -1;
  }
</script>

<div class="card m-sm-4 m-2 text-center">
  <table class="table table-striped table-hover table-bordered ">
    <caption>Klicka på en beställning för mer information</caption>
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Namn</th>
        <th scope="col " class="d-none d-sm-table-cell">Beställare</th>
        <th scope="col " class="d-none d-md-table-cell">Ansvarig</th>
        <th scope="col">Status</th>
        <th scope="col " class="d-none d-md-table-cell">Datum</th>
        <th scope="col">
          <form
            on:submit={filter}
            class="form-inline my-2 my-lg-0 text-center justify-content-end">
            <input
              bind:value={searchQuery}
              class="form-control mr-sm-2 "
              type="search"
              placeholder="Sök"
              aria-label="Sök" />
            <button class="btn btn-success bg my-2 my-sm-0" type="submit">
              Sök
            </button>
          </form>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each showOrders as order}
        <Order {apiCall} {getAllOrders} {order} {deleteOrder} />
      {/each}

    </tbody>
  </table>
</div>
