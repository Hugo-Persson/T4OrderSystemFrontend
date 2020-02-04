<script>
  export let user;
  export let getAllUsers;
  export let apiCall;
  async function deleteUser() {
    const id = user._id;
    try {
      if (!confirm("Är du säker att du vill radera användaren?")) return;

      const call = await apiCall("/deleteUser", JSON.stringify({ id: id }));

      if (call.error) {
        if (call.message === "NoDeleteYou") {
          alert("Du kan inte radera dig själv");
          return;
        }
        alert("Kunde inte radera användare");
      } else {
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function toggleUserAdmin() {
    let message = "";
    if (user.admin) {
      message = "Är du säker att du vill ta bort admin från denna användare?";
    } else {
      message = "Är du säker att du vill göra användaren admin?";
    }
    if (!confirm(message)) {
      return;
    }

    const id = user._id;

    try {
      const call = await apiCall(
        "/toggleUserAdmin",
        JSON.stringify({ id: id })
      );
      if (call.error) {
        if (call.message === "NoAdminYou") {
          alert("Du kan inte ta bort admin från dig själv");
          return;
        }
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
      Radera användare
    </button>
  </td>
</tr>
