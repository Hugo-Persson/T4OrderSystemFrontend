<script>
  import { url } from "../../Router.js";

  export let apiCall;
  export let user;

  let urlValue;
  url.subscribe(val => (urlValue = val));

  function directUser(e, path) {
    if (e) e.preventDefault();
    url.set(path);
  }
  async function logOut(e) {
    try {
      if (e) e.preventDefault();
      const call = await apiCall("/logOut");
      if (call.error) {
        alert("Kunde inte logga ut");
      } else {
        url.set("authenticate");
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
  <span class="navbar-brand mb-0 h1">Inloggad som {user.name}</span>

  <div class=" navbar" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'allOrders' ? 'active' : ''}"
        on:click={e => directUser(e, 'allOrder')}>
        Alla Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'myOrders' ? 'active' : ''}"
        on:click={e => directUser(e, 'myOrders')}>
        Mina Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'ongoingOrders' ? 'active' : ''}"
        on:click={e => directUser(e, 'ongoingOrders')}>
        Påbörjade Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'notStartedOrders' ? 'active' : ''}"
        on:click={e => directUser(e, 'notStartedOrders')}>
        Icke Påbörjade Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'finishedOrders' ? 'active' : ''}"
        on:click={e => directUser(e, 'finishedOrders')}>
        Avslutade Beställningar
      </a>
      <a
        href="#"
        class="nav-item nav-link {urlValue === 'manageUsers' ? 'active' : ''}
        "
        on:click={e => directUser(e, 'manageUsers')}>
        Hantera användare
      </a>

      <a class="nav-item nav-link" on:click={logOut} href="#">Logga ut</a>
    </div>
  </div>
</nav>
