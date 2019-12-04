<script>
  export let user;
</script>

<tr>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>
    <button type="button" class="btn btn-warning">Make admin</button>
  </td>
  <td>
    <button type="button" class="btn btn-danger">Delete user</button>
  </td>
</tr>
