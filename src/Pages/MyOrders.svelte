<script>
  import UserNavBar from "./Components/UserNavBar.svelte";
  import CustomerViewOrder from "./Components/CustomerViewOrder.svelte";

  export let apiCall;
  let orders = [];
  getOrders();
  async function getOrders() {
    try {
      const call = await apiCall("/getMyOrders", "");
      console.log("call", call);
      if (call.error) {
        alert("Kunde inte hämta din beställningar");
      } else {
        orders = call.orders;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<header>
  <UserNavBar {apiCall} />
</header>
<div class="card m-sm-4 m-2 text-center table-responsive-md">
  <table class="table table-striped table-hover table-bordered ">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Namn</th>
        <th scope="col ">Beställare</th>
        <th scope="col ">Ansvarig</th>
        <th scope="col">Status</th>
        <th scope="col ">Datum</th>
        <th scope="col ">Slutdatum</th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order}
        <CustomerViewOrder {order} />
      {/each}

    </tbody>
  </table>
</div>
