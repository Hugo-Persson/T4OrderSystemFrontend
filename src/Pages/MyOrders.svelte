<script>
  import UserNavBar from "./Components/UserNavBar.svelte";

  export let apiCall;
</script>

<header>
  <UserNavBar {apiCall} />
</header>
