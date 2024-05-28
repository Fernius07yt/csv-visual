# CSV to Sortable Table Web Application

This web application allows you to upload a CSV file and display its data in a sortable HTML table. 

## Features

- Upload a CSV file (`.csv`).
- Display the contents of the CSV file in an HTML table.
- Sort the table by clicking on the column headers.

## Usage

You can use the application directly on the website without downloading anything.

**Visit the application here: [CSV to Sortable Table](https://fernius07yt.github.io/csv-visual/)**

### Steps:

1. Open the [web application](https://fernius07yt.github.io/csv-visual/).
2. Click on the file input to select and upload a CSV file (`.csv`).
3. The table will be generated automatically, and you can sort the data by clicking on the column headers.

### Code Overview

#### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV a Tabla</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #fileInput {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>Subir y Ordenar Tabla de CSV</h1>
    <input type="file" id="fileInput" accept=".csv">
    <table id="csvTable" class="display">
        <thead>
            <tr id="tableHeader"></tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

#### JavaScript (`script.js`)

```javascript
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
```

### Dependencies

The project uses the following external libraries:

- [PapaParse](https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js)
- [DataTables](https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js)
- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js)

### Custom Styles

If you want to add custom styles, you can create a `styles.css` file and include it in the `index.html` file. Modify the CSS according to your design preferences.

### License

This project is licensed under the MIT License. Feel free to use and modify the code as needed.

### Acknowledgments

- [PapaParse](https://www.papaparse.com/)
- [DataTables](https://datatables.net/)
- [jQuery](https://jquery.com/)

Enjoy using the application! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
