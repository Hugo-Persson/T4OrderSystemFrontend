<script>
  export let order;
</script>

<tr>
  <th scope="col">{order.productNumber}</th>
  <td>{order.productName}</td>
  <td>{order.customer.name}</td>
  <td>
    {order.responsible.name}
    <br />
    <a
      href="mailto:{order.responsible.email === 'Nobody' ? '' : order.responsible.email}">
      {order.responsible.email === 'Nobody' ? '' : order.responsible.email}
    </a>

  </td>
  <td>{order.status}</td>
  <td>{new Date(order.date).toDateString()}</td>
  <td>
    {order.estimatedFinishDate ? new Date(order.estimatedFinishDate).toDateString() : 'Obestämt'}
  </td>

</tr>
