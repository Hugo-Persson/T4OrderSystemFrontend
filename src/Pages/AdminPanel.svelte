<script>
  import { Link } from "svelte-routing";
  import Order from "./Components/Order.svelte";

  let orders = [
    {
      name: "cool shit",
      number: 1,
      customer: "Hugo Persson",
      status: "Ej Påbörjad"
    },
    {
      name: "cool shit",
      number: 2,
      customer: "Hugo Persson",
      status: "Påbörjad"
    },
    {
      name: "cool shit",
      number: 3,
      customer: "Hugo Persson",
      status: "Avslutad"
    },
    {
      name: "cool shit",
      number: 4,
      customer: "Hugo Persson",
      status: "Ej Påbörjad"
    }
  ];
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
<div class="card m-sm-4 m-2 text-center">
  <div class="card-header h3">Alla beställningar</div>

  <table class="table table-striped table-hover table-bordered ">
    <caption>Klicka på en beställning för mer information</caption>
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Namn</th>
        <th scope="col " class="d-none d-sm-table-cell">Beställare</th>
        <th scope="col">Status</th>
        <th scope="col">
          <form
            class="form-inline my-2 my-lg-0 text-center justify-content-end">
            <input
              class="form-control mr-sm-2 "
              type="search"
              placeholder="Sök"
              aria-label="Sök" />
            <button class="btn btn-success bg my-2 my-sm-0" type="submit">
              Sök
            </button>
          </form>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order}
        <Order {order} />
      {/each}

    </tbody>
  </table>
</div>
