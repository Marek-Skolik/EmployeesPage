$(document).ready(function() {
  $('#employee-table').DataTable({
    columnDefs: [
    { targets: [0], visible: false }
    ],
    order: [[2, 'asc']]
    });
    
    $('#employee-form').submit(function(event) {
      event.preventDefault();
    
      var firstName = $('#first-name').val();
      var lastName = $('#last-name').val();
      var position = $('#position').val();
      var branchLocation = $('#branch-location').val();
      var startDate = $('#start-date').val();
      var salary = $('#salary').val();
        
      var table = $('#employee-table').DataTable();
      table.row.add([
      '',
      firstName,
      lastName,
      position,
      branchLocation,
      startDate,
      salary,
      '<button class="edit-btn">Edytuj</button><button class="delete-btn">Usuń</button>'
    ]).draw();

  $('#employee-form')[0].reset();
  });

  $('#export-csv').click(function() {
    var table = $('#employee-table').DataTable();
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
    link.setAttribute('download', 'employee_list.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

    $('#employee-table').on('click', '.edit-btn', function() {
        var table = $('#employee-table').DataTable();
        var row = $(this).closest('tr');
        var data = table.row(row).data();

        $('#employee-id').val(data[0]);
        $('#edit-first-name').val(data[1]);
        $('#edit-last-name').val(data[2]);
        $('#edit-position').val(data[3]);
        $('#edit-branch-location').val(data[4]);
        $('#edit-start-date').val(data[5]);
        $('#edit-salary').val(data[6]);
        
        $('#edit-modal').modal('show');
    });

    $('#save-edits').click(function() {
      var id = $('#employee-id').val();
      var firstName = $('#edit-first-name').val();
      var lastName = $('#edit-last-name').val();
      var position = $('#edit-position').val();
      var branchLocation = $('#edit-branch-location').val();
      var startDate = $('#edit-start-date').val();
      var salary = $('#edit-salary').val();
  
      var table = $('#employee-table').DataTable();
      var row = table.row('#' + id);
  
      row.data([
        id,
        firstName,
        lastName,
        position,
        branchLocation,
        startDate,
        salary,
        '<button class="edit-btn">Edytuj</button><button class="delete-btn">Usuń</button>'
      ]).draw();
  
      $('#edit-modal').modal('hide');
    });
  

      $('#employee-table').on('click', '.delete-btn', function() {
        var table = $('#employee-table').DataTable();
        var row = $(this).closest('tr');
        table.row(row).remove().draw();
      });
    });