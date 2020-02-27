<script>
  export let user;
  export let getAllUsers;
  export let apiCall;
  async function toggleUserExistence() {
    console.log("Toggle user");
    const id = user._id;
    try {
      let message = "";
      if (!user.admin) {
        message = "Är du säker att du vill radera användaren?";
      } else if (user.active) {
        message = "Är du säker att du vill göra användaren inaktiv?";
      } else {
        message = "Är du säker att du vill göra användaren aktiv";
      }

      if (!confirm(message)) return;

      const call = await apiCall(
        "/toggleUserExistence",
        JSON.stringify({ id: id })
      );
      console.log("CALL", call);
      if (call.error) {
        if (call.message === "NoDeleteYou") {
          alert("Du kan inte göra dig själv inaktiv");
          return;
        }
        alert("Ett fel uppstod, försök igen senare");
      } else {
        console.log("YAHHH", "EMMEMEMEMEME");

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
      console.log("CALL", call);
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
    <button
      type="button"
      on:click={toggleUserExistence}
      class="btn {user.active ? 'btn-danger' : 'btn-success'}">
      {user.admin ? (user.active ? 'Gör Inaktiv' : 'Gör Aktiv') : 'Radera användare'}
    </button>
  </td>
</tr>
