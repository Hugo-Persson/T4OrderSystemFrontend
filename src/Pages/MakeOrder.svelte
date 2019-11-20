<script>
  import { navigate } from "svelte-routing";
  export let apiCall;
  let user;
  let loading = true;
  checkUser();
  async function checkUser() {
    try {
      const call = await apiCall("/checkAccount");
      console.log(call);
      if (call.authenticated) {
        user = call;
        if (call.admin) {
          navigate("/admin");
          return;
        } else {
          loading = false;
          return;
        }
      } else {
        navigate("/authenticate");
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

{#if loading}Loading...{:else}not loading{/if}
