<script>
  export let order;
</script>

<tr>
  <th scope="col">{order.productNumber}</th>
  <td>{order.productName}</td>
  <td>{order.customer.name}</td>
  <td>{order.responsible.name}</td>
  <td>{order.status}</td>
  <td>{new Date(order.date).toDateString()}</td>
</tr>
