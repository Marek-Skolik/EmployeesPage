$(document).ready(function() {
  $('#tabela-pracownikow').DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/Polish.json'
    },
    columnDefs: [
      { targets: [0], visible: false }
    ],
    order: [[2, 'asc']]
  });

  $('#pracownik-form').submit(function(event) {
    event.preventDefault();

    var imie = $('#imie').val();
    var nazwisko = $('#nazwisko').val();
    var stanowisko = $('#stanowisko').val();
    var filia = $('#filia').val();
    var dataRozpoczecia = $('#data-rozpoczecia').val();
    var zarobki = $('#zarobki').val();

    var table = $('#tabela-pracownikow').DataTable();
    table.row.add([
      imie,
      nazwisko,
      stanowisko,
      filia,
      dataRozpoczecia,
      zarobki,
      '<button class="edit-btn">Edytuj</button><button class="delete-btn">Usuń</button>'
    ]).draw();

    $('#pracownik-form')[0].reset();
  });

  $('#eksport-csv').click(function() {
    var table = $('#tabela-pracownikow').DataTable();
    var data = table
      .rows()
      .data()
      .toArray();
    var csv = '';
    for (var i = 0; i < data.length; i++) {
      csv += data[i].join(';') + '\n';
    }
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'lista_pracownikow.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  $('#tabela-pracownikow').on('click', '.edit-btn', function() {
    var table = $('#tabela-pracownikow').DataTable();
    var row = $(this).closest('tr');
    var data = table.row(row).data();

    $('#pracownik-id').val(data[0]);
    $('#edycja-imie').val(data[1]);
    $('#edycja-nazwisko').val(data[2]);
    $('#edycja-stanowisko').val(data[3]);
    $('#edycja-filia').val(data[4]);
    $('#edycja-data-rozpoczecia').val(data[5]);
    $('#edycja-zarobki').val(data[6]);

    $('#modal-edycja').modal('show');
  });

  $('#zapisz-edycje').click(function() {
    var id = $('#pracownik-id').val();
    var imie = $('#edycja-imie').val();
    var nazwisko = $('#edycja-nazwisko').val();
    var stanowisko = $('#edycja-stanowisko').val();
    var filia = $('#edycja-filia').val();
    var dataRozpoczecia = $('#edycja-data-rozpoczecia').val();
    var zarobki = $('#edycja-zarobki').val();

    var table = $('#tabela-pracownikow').DataTable();
    var row = table.row('#' + id);

    row.data([
      id,
      imie,
      nazwisko,
      stanowisko,
      filia,
      dataRozpoczecia,
      zarobki,
      '<button class="edit-btn">Edytuj</button><button class="delete-btn">Usuń</button>'
    ]).draw();

    $('#modal-edycja').modal('hide');
  });

  $('#tabela-pracownikow').on('click', '.delete-btn', function() {
    var table = $('#tabela-pracownikow').DataTable();
    var row = $(this).closest('tr');
    table.row(row).remove().draw();
  });
});