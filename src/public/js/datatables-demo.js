// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable({
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ elementos",
      info: "Mostrando del _START_ al _END_ elemento de un total de _TOTAL_ elementos",
      paginate: {
        first: "Primero",
        previous: "Siguiente",
        next: "Anterior",
        last: "Ultimo"
      },
      zeroRecords:    "No hay resultados :("
    }
  });
});
