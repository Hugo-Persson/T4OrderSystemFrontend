<script>
  import Login from "./Pages/Login.svelte";
  import PageNotFound from "./Pages/404.svelte";
  import MakeOrder from "./Pages/MakeOrder.svelte";
  import ExpandedOrder from "./Pages/ExpandedOrder.svelte";
  import AdminPanel from "./Pages/AdminPanel.svelte";
  import MyOrders from "./Pages/MyOrders.svelte";
  import LoadingRoute from "./Pages/LoadingRoute.svelte";

  import { url, params } from "./Router.js";
  import { selectedOrder } from "./Store.js";

  let urlValue;
  let userValue;
  let selectedOrderValue;
  let paramsValue;

  selectedOrder.subscribe(value => (selectedOrderValue = value));

  url.subscribe(value => (urlValue = value));
  params.subscribe(val => (paramsValue = val));

  function apiCall(path, body, type, noAuthHandeling) {
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
      fetch("http://localhost:8000" + path, init)
        .then(res => res.json())
        .then(body => {
          console.log("answer");
          if (body.error) {
            if (!noAuthHandeling && body.message === "NoAuth") {
              console.log("Logged out");
              alert("Du har blivit utloggad");
              url.set("authenticate");
            } else resolve(body);
          } else {
            resolve(body);
            console.log(body);
          }
        })
        .catch(err => reject(err));
    });
  }
  routeUser();
  async function routeUser() {
    try {
      console.log("route user");
      const user = await apiCall("/checkAccount", undefined, undefined, true);
      console.log("user", user);

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
        userValue = user;
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
  <MakeOrder user={userValue || paramsValue.user} {apiCall} />
{:else if urlValue === 'expandedOrder'}
  <ExpandedOrder order={selectedOrderValue} />
{:else if urlValue === 'myOrders'}
  <MyOrders {apiCall} />
{:else}
  <LoadingRoute />
{/if}

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
