<script>
  export let user;
  export let getAllUsers;
  async function deleteUser() {
    const id = user._id;
    try {
      const call = await apiCall("deleteUser", JSON.stringify({ id: id }));
      if (call.error) {
        alert("Kunde inte radera användare");
      } else {
        alert("användare raderad");
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function toggleUserAdmin() {
    const id = user._id;
    try {
      const call = await apiCall(
        "/toggleUserAdmin",
        JSON.stringify({ id: id })
      );
      if (call.error) {
        alert("Ett fel uppstod försök igen senare");
      } else {
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<tr>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>
    {#if user.admin}
      <button type="button" on:click={toggleUserAdmin} class="btn btn-warning">
        Ta bort admin
      </button>
    {:else}
      <button type="button" on:click={toggleUserAdmin} class="btn btn-warning">
        Gör admin
      </button>
    {/if}

  </td>
  <td>
    <button type="button" on:click={deleteUser} class="btn btn-danger">
      Rader användare
    </button>
  </td>
</tr>
