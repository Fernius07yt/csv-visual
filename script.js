document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
        complete: function(results) {
            generateTable(results.data);
            plotMap(results.data);
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

function plotMap(data) {
    // Find the index of the Position column
    const headerRow = data[0];
    const positionIndex = headerRow.indexOf("Position");

    if (positionIndex === -1) return; // If there's no "Position" column, do nothing

    // Initialize the map
    const map = L.map('map').setView([0, 0], 2); // Set to global view initially
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    const coordinates = [];

    // Extract coordinates from the data
    data.slice(1).forEach(row => {
        const position = row[positionIndex];
        if (position) {
            const [lat, lng] = position.split(',').map(Number);
            coordinates.push([lat, lng]);
        }
    });

    if (coordinates.length === 0) return; // No valid coordinates

    // Add markers and path to the map
    const latLngs = coordinates.map(coord => L.latLng(coord[0], coord[1]));
    L.polyline(latLngs, { color: 'blue' }).addTo(map);
    latLngs.forEach(latlng => L.marker(latlng).addTo(map));

    // Fit the map to the bounds of the coordinates
    map.fitBounds(latLngs);
}
