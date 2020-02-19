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
      console.log("path", path);
      fetch("http://localhost:8000" + path, init)
        .then(res => res.json())
        .then(async body => {
          console.log("answer");
          if (body.error) {
            if (!noAuthHandeling && body.message === "NoAuth") {
              console.log("Logged out");
              alert("Du har blivit utloggad");
              url.set("authenticate");
            } else if (body.message === "NotAdmin") {
              alert(
                "Du är inte admin längre, detta har troligen hänt för någon annan admin har tagit bort din admin tillgång, du kommer nu bli skickad till rätt sida"
              );
              routeUser();
            } else if (
              body.message === "NotActive" &&
              urlValue !== "authenticate"
            ) {
              alert(
                "Ditt konto är inaktivt, detta har hänt då någon admin har gjort det inaktivt, du kan använda kontot efter någon admin har gjort dig aktiv igen, du kommer nu bli utloggad"
              );
              await apiCall("/logOut");

              url.set("authenticate");
            } else if (body.message === "NoAccount" && path !== "/login") {
              alert(
                "Ditt konto har blivit raderat, detta beror på att någon admin har tagit bort det, du kommer nu bli utloggad"
              );
              await apiCall("/logOut");
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
          return "allOrders";
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
{:else if urlValue === 'allOrders' || urlValue === 'adminMyOrders' || urlValue === 'ongoingOrders' || urlValue === 'notStartedOrders' || urlValue === 'myProfile' || urlValue === 'finishedOrders' || urlValue === 'manageUsers' || urlValue === 'expandedOrder'}
  <AdminPanel user={userValue || paramsValue.user} {apiCall} />
{:else if urlValue === 'makeOrder'}
  <MakeOrder user={userValue || paramsValue.user} {apiCall} />
{:else if urlValue === 'expandedOrder'}
  <ExpandedOrder order={selectedOrderValue} />
{:else if urlValue === 'myOrders'}
  <MyOrders {apiCall} />
{:else}
  <LoadingRoute />
{/if}
