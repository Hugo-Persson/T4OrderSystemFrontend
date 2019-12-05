<script>
  import AdminPanelNav from "./Components/AdminPanelNav.svelte";
  import User from "./Components/User.svelte";
  export let apiCall;
  let searchQuery = "";
  let allUsers = [];
  let showUsers = allUsers;
  getAllUsers();
  async function getAllUsers() {
    try {
      const call = await apiCall("/getAllUsers");
      console.log("call", call);
      if (call.error) {
        //TODO: Error handeling
        alert("Kunde inte hämta anvädare från servern");
      } else {
        allUsers = call.users;
        showUsers = call.users;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function search(e) {
    if (e) e.preventDefault();
    console.log(allUsers);
    showUsers = allUsers.filter(
      user =>
        searchProperty(user.name) ||
        searchProperty(user.email) ||
        (searchQuery === "admin" ? user.admin : false)
    );
  }
  function searchProperty(prop) {
    console.log(prop, searchQuery);
    console.log(
      prop.toLowerCase().search(searchQuery.toLocaleLowerCase()) > -1
    );
    return prop.toLowerCase().search(searchQuery.toLocaleLowerCase()) > -1;
  }
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
              on:submit={search}
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
          {#each showUsers as user}
            <User {getAllUsers} {user} />
          {/each}
        </tbody>

      </table>
    </div>
  </div>
</div>
