<script>
  import Login from "./Pages/Login.svelte";
  import PageNotFound from "./Pages/404.svelte";
  import Orders from "./Pages/Orders.svelte";
  import MakeOrder from "./Pages/MakeOrder.svelte";
  import ManageUsers from "./Pages/ManageUsers.svelte";
  import ExpandedOrder from "./Pages/ExpandedOrder.svelte";
  import AdminPanel from "./Pages/AdminPanel.svelte";
  import MyOrders from "./Pages/MyOrders.svelte";
  import { url } from "./Router.js";
  import { selectedOrder } from "./Store.js";

  let urlValue;
  let userValue;
  let selectedOrderValue;

  selectedOrder.subscribe(value => (selectedOrderValue = value));
  url.subscribe(value => (urlValue = value));

  function apiCall(path, body, type) {
    const contentType = !(type === "multipart/form-data");
    console.log(body);
    return new Promise((resolve, reject) => {
      const init = {
        method: "POST",
        mode: "cors",
        credentials: "include",

        body: body
      };
      if (contentType) {
        // If I want to send form data I don't want to set contentType
        init.headers = {
          "Content-Type": "application/json"
        };
      }
      console.log(init);
      fetch("http://localhost:8000" + path, init)
        .then(res => {
          console.log(res.headers.get("set-cookie"));
          console.log(document.cookie);
          return res.json();
        })
        .then(body => resolve(body))
        .catch(err => reject(err));
    });
  }
  routeUser();
  async function routeUser() {
    try {
      const user = await apiCall("/checkAccount");
      console.log("user", user);
      userValue = user;
      const path = checkUser(user);
      console.log(path);
      url.set(path);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  }
  function checkUser(user) {
    try {
      if (user.authenticated) {
        if (user.admin) {
          return "orders";
        } else {
          return "makeOrder";
        }
      } else {
        return "authenticate";
      }
    } catch (err) {
      console.log(err);
    }
  }
  $: console.log(urlValue);
</script>

<style>

</style>

{#if urlValue === 'authenticate'}
  <Login {apiCall} />
{:else if urlValue === 'orders' || urlValue === 'manageUsers' || urlValue === 'expandedOrder'}
  <AdminPanel {apiCall} />
{:else if urlValue === 'makeOrder'}
  <MakeOrder user={userValue} {apiCall} />
{:else if urlValue.substring(0, 14) === 'expandedOrder'}
  <ExpandedOrder order={selectedOrderValue} />
{:else if urlValue === 'myOrders'}
  <MyOrders {apiCall} />
{:else}Checking route{/if}

<!-- <Router {url}>
  <Route path="/">loading</Route>
  <Route path="/authenticate">
    <Login {apiCall} />
  </Route>
  <Route path="/orders">
    <Orders {apiCall} />
  </Route>
  <Route path="/makeOrder">
    <MakeOrder {apiCall} {checkUser} />
  </Route>
  <Route path="*" component={PageNotFound} />

</Router> -->
