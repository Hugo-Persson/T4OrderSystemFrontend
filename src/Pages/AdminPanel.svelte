<script>
  import Order from "./Components/Order.svelte";
  import { url } from "../Router.js";
  export let apiCall;

  getAllOrders();
  let searchQuery = "";

  let allOrders = [];
  let showOrders = allOrders;
  function filter(e) {
    if (e) e.preventDefault();
    showOrders = allOrders.filter(
      order =>
        order.number == searchQuery ||
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

  async function getAllOrders() {
    try {
      const call = await apiCall("/getAllorders");
      if (call.error) {
        console.log("error", call.message);
      }
      console.log("call", call);
      allOrders = call.data;
      console.log("allOrders", allOrders);
      showOrders = allOrders;
      console.log("show", showOrders);
    } catch (err) {
      console.log(err);
    }
  }
  function directUser(e, path) {
    if (e) e.preventDefault();
    url.set(path);
  }
</script>

<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
  <span class="navbar-brand mb-0 h1">Admin panel</span>

  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a
        href="#"
        class="nav-item nav-link active"
        on:click={e => directUser(e, 'adminPanel')}>
        Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link "
        on:click={e => directUser(e, 'manageUsers')}>
        Hantera användare
      </a>

      <a class="nav-item nav-link" href="#">Logga ut</a>
    </div>
  </div>
</nav>
<div class="card m-sm-4 m-2 text-center">
  <div class="card-header h3">Alla beställningar</div>

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
        <Order {apiCall} {getAllOrders} {order} />
      {/each}

    </tbody>
  </table>
</div>
