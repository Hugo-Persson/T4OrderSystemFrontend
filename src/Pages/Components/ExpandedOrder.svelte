<script>
  export let order;
</script>

<style>
  /*   .card {
    display: inline-block;
    width: 20%;
    min-height: 100%;
  } */
</style>

<div class="container-fluid">
  <div class="row row-cols-3">
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Orderdetaljer</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Datum: {new Date(order.date).toDateString()}
          </li>
          <li class="list-group-item">
            Status:
            <select class="form-control" id="exampleFormControlSelect2">
              <option>Ej påbörjad</option>
              <option>Påbörjad</option>
              <option>Avslutad</option>
            </select>
          </li>
          <li class="list-group-item">Ordernummer: {order.number}</li>
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
            <li class="list-group-item">
              <a href={'http://localhost:8000' + file.url}>
                {file.originalName}
              </a>
            </li>
            <li class="list-group-item" style="border:none">
              {file.description}
            </li>
          {/each}
        </ul>
      </div>
    </div>

  </div>
</div>
