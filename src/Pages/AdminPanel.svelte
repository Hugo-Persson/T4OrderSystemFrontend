<script>
  // This component exists so the data won't need to be fetched every time the user switches page

  import Orders from "./Orders.svelte";
  import ManageUsers from "./ManageUsers.svelte";
  import AdminNavBar from "./Components/AdminPanelNav.svelte";
  import ExpandedOrder from "./ExpandedOrder.svelte";
  import { url, params } from "../Router.js";

  export let apiCall;
  let urlValue;
  let paramsValue;
  params.subscribe(e => (paramsValue = e));
  url.subscribe(e => (urlValue = e));

  let allOrders = [];
  let allUsers = [];
  getAllUsers();
  getAllOrders();
  async function getAllOrders() {
    try {
      const call = await apiCall("/getAllorders");
      if (call.error) {
        console.log("error", call.message);
      }
      console.log("call", call);
      allOrders = call.data;
      console.log("allOrders", allOrders);
    } catch (err) {
      console.log(err);
    }
  }
  async function getAllUsers() {
    try {
      const call = await apiCall("/getAllUsers");
      console.log("call", call);
      if (call.error) {
        //TODO: Error handeling
        alert("Kunde inte hämta anvädare från servern");
      } else {
        allUsers = call.users;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<header>
  <AdminNavBar />
</header>
{#if urlValue === 'orders'}
  <Orders {apiCall} {getAllOrders} {allOrders} />
{:else if urlValue === 'expandedOrder'}
  <ExpandedOrder order={paramsValue.order} />
{:else}
  <ManageUsers {apiCall} {getAllUsers} {allUsers} />
{/if}
