<script>
  import { Link } from "svelte-routing";
</script>

<style>
  main {
    width: 100vw;
    height: 100vh;
  }
</style>

<main class="bg-danger">
  <div class="jumbotron">
    <h1 class="display-4">404 Page not found</h1>
    <p class="lead">Could not found the page for the entered url</p>
    <hr class="my-4" />
    <Link to="/">Go to home page</Link>
  </div>
</main>
