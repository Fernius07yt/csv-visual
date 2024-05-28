document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
        complete: function(results) {
            generateTable(results.data);
        }
    });
}

function generateTable(data) {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length === 0) return;

    // Generar encabezado de la tabla
    const headerRow = data[0];
    headerRow.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    // Generar cuerpo de la tabla
    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });

    // Inicializar DataTables
    $('#csvTable').DataTable();
}
