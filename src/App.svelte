<script>
  export let url;
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./Pages/Login.svelte";
  import PageNotFound from "./Pages/404.svelte";
  import AdminPanel from "./Pages/AdminPanel.svelte";
  import MakeOrder from "./Pages/MakeOrder.svelte";

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
  if (window.location.pathname === "/") routeUser();
  async function routeUser() {
    console.log("hey");
    try {
      const user = await apiCall("/checkAccount");
      console.log(user);
      const path = checkUser(user);
      console.log(path);
      navigate(path);
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  }
  function checkUser(user) {
    try {
      if (user.authenticated) {
        if (user.admin) {
          return "/adminPanel";
        } else {
          return "/makeOrder";
        }
      } else {
        return "/authenticate";
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>

</style>

<Router {url}>
  <Route path="/">loading</Route>
  <Route path="/authenticate">
    <Login {apiCall} />
  </Route>
  <Route path="/adminPanel">
    <AdminPanel {apiCall} />
  </Route>
  <Route path="/makeOrder">
    <MakeOrder {apiCall} {checkUser} />
  </Route>
  <Route path="*" component={PageNotFound} />

</Router>
