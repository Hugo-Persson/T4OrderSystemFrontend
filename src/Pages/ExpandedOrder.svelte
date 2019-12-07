<script>
  export let order;
  export let toggleExpand;
  export let deleteOrder;
  import { slide } from "svelte/transition";
</script>

<style>
  /*   .card {
    display: inline-block;
    width: 20%;
    min-height: 100%;
  } */
</style>

<div class="container-fluid text-left" transition:slide>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Orderdetaljer</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Ordernummer: {order.number}</li>
          <li class="list-group-item">Namn: {order.productName}</li>

          <li class="list-group-item">
            Datum: {new Date(order.date).toDateString()}
          </li>

          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheckDisabled1"
                disabled />
              <label class="custom-control-label" for="customCheckDisabled1">
                Tillverkning
              </label>
            </div>
          </li>
          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheckDisabled1"
                disabled />
              <label class="custom-control-label" for="customCheckDisabled1">
                Tillverkningsunderlag
              </label>
            </div>
          </li>
          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheckDisabled1"
                disabled />
              <label class="custom-control-label" for="customCheckDisabled1">
                Beräkning
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col mb-4 ">
      <div class="card h-100">
        <div class="card-header">Beställare</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Namn: {order.customer.name}</li>
          <li class="list-group-item">
            Email:
            <a href="mailto:{order.customer.email}">{order.customer.email}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Ansvarig</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Namn:
            <input
              type="text"
              class="form-control "
              bind:value={order.responsible.name} />
          </li>
          <li class="list-group-item">
            Email:
            <input
              type="email"
              bind:value={order.responsible.email}
              class="form-control"
              aria-describedby="emailHelp" />
          </li>
          <li class="list-group-item">
            Status:
            <select class="form-control" id="exampleFormControlSelect2">
              <option>Ej påbörjad</option>
              <option>Påbörjad</option>
              <option>Avslutad</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Produkt beskrivning</div>
        <div class="card-body">{order.productDescription}</div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Önskemål</div>
        <div class="card-body">{order.wishes}</div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Filer</div>
        <ul class="list-group list-group-flush">
          {#each order.files as file}
            <li class="list-group-item" style="border:none">
              <a href={'http://localhost:8000' + file.url}>
                {file.originalName}
              </a>
            </li>
            <li class="list-group-item">{file.description}</li>
          {/each}
        </ul>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col ">
      <button
        class="btn btn-lg btn-danger"
        on:click={() => deleteOrder(order._id)}>
        Radera beställningar
      </button>

    </div>
    <div class="col" />
    <div class="col ">
      <button class="btn btn-lg btn-success">Spara ändringar</button>
    </div>
  </div>
</div>
