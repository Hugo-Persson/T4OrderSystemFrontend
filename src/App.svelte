<script>
  export let url;
  import { Router, Route } from "svelte-routing";
  import Login from "./Pages/Login.svelte";
  import PageNotFound from "./Pages/404.svelte";
  import AdminDashboard from "./Pages/AdminDashboard.svelte";
  import MakeOrder from "./Pages/MakeOrder.svelte";

  function apiCall(path, data) {
    console.log(data);
    console.log(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      const init = {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      fetch("http://localhost:8000" + path, init)
        .then(res => {
          console.log(res.headers.get("set-cookie"));
          console.log(document.cookie);
          return res.json();
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
</script>

<style>

</style>

<Router {url}>
  <Route path="/">
    <Login {apiCall} />
  </Route>
  <Route path="/authenticate">
    <Login {apiCall} />
  </Route>
  <Route path="/adminDashboard">
    <AdminDashboard {apiCall} />
  </Route>
  <Route path="/makeOrder">
    <MakeOrder {apiCall} />
  </Route>
  <Route path="*" component={PageNotFound} />

</Router>
