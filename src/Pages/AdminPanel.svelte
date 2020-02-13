<script>
  // This component exists so the data won't need to be fetched every time the user switches page

  import ManageOrders from "./ManageOrders.svelte";
  import ManageUsers from "./ManageUsers.svelte";
  import AdminNavBar from "./Components/AdminPanelNav.svelte";
  import ExpandedOrder from "./ExpandedOrder.svelte";
  import { url, params } from "../Router.js";

  export let apiCall;
  export let user;

  let urlValue;
  let paramsValue;
  params.subscribe(e => (paramsValue = e));
  url.subscribe(e => (urlValue = e));

  let allOrders = [];
  let allUsers = [];
  let allAdmins = [];

  let myOrders = [];
  let notStartedOrders = [];
  let ongoingOrders = [];
  let completedOrders = [];

  getAllUsers();
  getAllOrders();
  getAllAdmins();

  async function sortAllOrders() {
    console.log("All orders", allOrders);
    myOrders = allOrders.filter(value => {
      return value.responsible.email === user.email;
    });
    notStartedOrders = allOrders.filter(value => {
      console.log(value.status === "Ej påbörjad");

      return value.status === "Ej påbörjad";
    });
    ongoingOrders = allOrders.filter(value => {
      return value.status === "Påbörjad";
    });
    completedOrders = allOrders.filter(value => {
      return value.status === "Avslutad";
    });
    console.log("My orders", myOrders);
    console.log("Not startedOrder", notStartedOrders);
    console.log("Ongoing orders", ongoingOrders);
    console.log("Completed orders", completedOrders);
  }
  async function getAllAdmins() {
    try {
      const call = await apiCall("/getAllAdmins");
      if (call.error) {
        //Unknow error
      } else {
        allAdmins = call.allAdmins;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getAllOrders() {
    try {
      const call = await apiCall("/getAllOrders");
      if (call.error) {
        console.log("error", call.message);
      }

      allOrders = call.data;
      sortAllOrders();
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
  async function deleteOrder(id) {
    try {
      if (!confirm("Är du säker att du vill radera beställning")) return;
      const call = await apiCall("/deleteOrder", JSON.stringify({ id: id }));
      console.log(call);
      if (call.error) {
        // TODO:Error handeling
      } else {
        console.log("success");
        url.set("allOrders");
        getAllOrders();
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<header>
  <AdminNavBar {user} {apiCall} />
</header>
{#if urlValue === 'allOrders'}
  <ManageOrders
    {apiCall}
    {getAllOrders}
    header="Alla beställningar"
    {allOrders}
    {deleteOrder} />
{:else if urlValue === 'adminMyOrders'}
  <ManageOrders
    {apiCall}
    {getAllOrders}
    header="Mina beställningar"
    allOrders={myOrders}
    {deleteOrder} />
{:else if urlValue === 'ongoingOrders'}
  <ManageOrders
    {apiCall}
    {getAllOrders}
    header="Påbörjade beställningar"
    allOrders={ongoingOrders}
    {deleteOrder} />
{:else if urlValue === 'notStartedOrders'}
  <ManageOrders
    {apiCall}
    {getAllOrders}
    header="Ej påbörjade beställningar"
    allOrders={notStartedOrders}
    {deleteOrder} />
{:else if urlValue === 'finishedOrders'}
  <ManageOrders
    {apiCall}
    {getAllOrders}
    header="Avslutade beställningar"
    allOrders={completedOrders}
    {deleteOrder} />
{:else if urlValue === 'expandedOrder'}
  <ExpandedOrder
    order={paramsValue.order}
    {apiCall}
    {deleteOrder}
    {allAdmins}
    {getAllOrders} />
{:else}
  <ManageUsers {apiCall} {getAllUsers} {allUsers} />
{/if}
