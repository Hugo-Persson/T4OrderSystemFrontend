<script>
  import { Link } from "svelte-routing";
  let orders = [
    {
      name: "cool shit",
      number: 1,
      from: "Hugo Persson"
    },
    {
      name: "cool shit",
      number: 1,
      from: "Hugo Persson"
    },
    {
      name: "cool shit",
      number: 1,
      from: "Hugo Persson"
    },
    {
      name: "cool shit",
      number: 1,
      from: "Hugo Persson"
    }
  ];
  import Order from "./Components/Order.svelte";
</script>

<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
  <span class="navbar-brand mb-0 h1">Admin panel</span>

  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="/adminPanel/manageUser">
        Manage users
      </a>
      <a class="nav-item nav-link" href="">Settings</a>
    </div>
  </div>
</nav>
<div class="container-fluid">

  <div class="card m-4 text-center">
    <div class="card-header h3">Orders</div>

    <div class="container-fluid">
      <div class="row text-center">
        <div class="col-1">#</div>
        <div class="col-4">Name</div>
        <div class="col-3">Orderer</div>
        <div class="col-2">Status</div>

        <div class="col-2" />
      </div>
      {#each orders as order}
        <Order {order} />
      {/each}
    </div>
  </div>
</div>
