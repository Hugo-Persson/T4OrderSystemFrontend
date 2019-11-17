<script>
  export let url;
  import { Router, Route } from "svelte-routing";
  import Login from "./Pages/Login.svelte";
  import PageNotFound from "./Pages/404.svelte";

  function apiCall(path, data) {
    console.log(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      fetch("http://localhost:8000" + path, init)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
</script>

<style>

</style>

<Router {url}>
  <div>
    <Route path="/">
      <Login {apiCall} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </div>
</Router>
