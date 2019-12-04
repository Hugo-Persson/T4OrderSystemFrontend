<script>
  import AdminPanelNav from "./Components/AdminPanelNav.svelte";
  import User from "./Components/User.svelte";
  export let apiCall;
  let searchQuery;
  let users = [
    { name: "Hugo Persson", email: "hugopersson7@gmail.com", admin: false }
  ];
  function filter() {}
</script>

<AdminPanelNav {apiCall} />
<div class="container-fluid ">
  <div class="card">
    <div class="card-header">Användare</div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead class="thead-dark">
          <th scope="col">Namn</th>
          <th scope="col ">Email</th>
          <th scope="col" colspan="2">
            <form
              on:submit={filter}
              class="form-inline my-2 my-lg-0 text-center justify-content-end">
              <input
                bind:value={searchQuery}
                class="form-control mr-sm-2 "
                type="search"
                placeholder="Sök"
                aria-label="Sök" />
              <button class="btn btn-success bg my-2 my-sm-0" type="submit">
                Sök
              </button>
            </form>
          </th>

        </thead>
        <tbody>
          {#each users as user}
            <User {user} />
          {/each}
        </tbody>

      </table>
    </div>
  </div>
</div>
