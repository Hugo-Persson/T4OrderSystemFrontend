<script>
  import { slide } from "svelte/transition";
  import { url } from "../Router.js";
  import Datepicker from "./Components/Datepicker/Datepicker.svelte";

  export let order;
  export let toggleExpand;
  export let deleteOrder;
  export let apiCall;
  export let allAdmins;
  export let getAllOrders;

  let selectedAdmin;
  async function saveChanges() {
    try {
      const call = await apiCall(
        "/updateOrder",
        JSON.stringify({
          id: order._id,
          email: selectedAdmin,
          status: order.status,
          estimatedFinishDate: order.estimatedFinishDate
        })
      );
      if (call.error) {
        alert("Ett fel uppstod, försök igen");
      } else {
        getAllOrders();
        url.set("allOrders");
      }
    } catch (err) {
      console.log(err);
    }
  }
  $: format = !order.estimatedFinishDate
    ? "Datum ej bestämt"
    : "#{l} den #{j}/#{m}/#{Y}";
  function estimatedTimeUpdate(e) {
    order.estimatedFinishDate = e.detail.date;
  }
</script>

<div class="container-fluid text-left" transition:slide>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
    <div class="col mb-4">
      <div class="card h-100">
        <div class="card-header">Orderdetaljer</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Ordernummer: {order.productNumber}</li>
          <li class="list-group-item">Namn: {order.productName}</li>

          <li class="list-group-item">
            Datum: {new Date(order.date).toDateString()}
          </li>

          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                checked={order.missionType.production}
                disabled />
              <label class="custom-control-label">Tillverkning</label>
            </div>
          </li>
          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                checked={order.missionType.productionDocumentation}
                disabled />
              <label class="custom-control-label">Tillverkningsunderlag</label>
            </div>
          </li>
          <li class="list-group-item">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                checked={order.missionType.calculation}
                disabled />
              <label class="custom-control-label">Beräkning</label>
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
            Välj ansvarig:
            <select class="form-control" bind:value={selectedAdmin}>
              <option
                value="Nobody"
                selected={order.responsible.email === 'Nobody'}>
                Ingen
              </option>
              {#each allAdmins as admin}
                <option
                  value={admin.email}
                  selected={admin.email === order.responsible.email}>
                  {admin.name}
                </option>
              {/each}
            </select>
          </li>

          <li class="list-group-item">
            Status:
            <select
              class="form-control"
              bind:value={order.status}
              id="exampleFormControlSelect2">
              <option value="Ej Påbörjad">Ej påbörjad</option>
              <option value="Påbörjad">Påbörjad</option>
              <option value="Avslutad">Avslutad</option>
            </select>
          </li>
          <li class="list-group-item">
            Estimerat slutdatum:
            <Datepicker
              {format}
              on:dateSelected={estimatedTimeUpdate}
              selected={order.estimatedFinishDate ? new Date(order.estimatedFinishDate) : undefined} />
          </li>
          <li class="list-group-item text-center">
            <button class="btn btn-lg btn-success" on:click={saveChanges}>
              Spara ändringar
            </button>
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
              <a href={file.url}>{file.originalName}</a>
            </li>
            <li class="list-group-item">{file.description}</li>
          {/each}
        </ul>
      </div>
    </div>

  </div>
  <div class="row">
    <div class="col " />
    <div class="col text-center">
      <button
        class="btn btn-lg btn-danger"
        on:click={() => deleteOrder(order._id)}>
        Radera beställningar
      </button>
    </div>
    <div class="col " />
  </div>
</div>
