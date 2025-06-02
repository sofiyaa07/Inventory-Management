document.getElementById("csvFileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
        alert("No file selected!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const csvData = event.target.result;
        console.log("CSV Data:", csvData); // Debugging log
        displayCSV(csvData);
    };
    reader.onerror = function () {
        console.error("Error reading file:", reader.error);
    };
    reader.readAsText(file);
});

function displayCSV(csvData) {
    const rows = csvData.split("\n").map(row => row.split(","));
    console.log("Parsed Rows:", rows); // Debugging log

    const table = document.getElementById("csvTable");

    // Clear existing table content
    table.innerHTML = "";

    // Add table headers
    const headerRow = document.createElement("tr");
    rows[0].forEach(header => {
        const th = document.createElement("th");
        th.textContent = header.trim();
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add table rows
    rows.slice(1).forEach(row => {
        const tableRow = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell.trim();
            tableRow.appendChild(td);
        });
        table.appendChild(tableRow);
    });

    console.log("Table updated successfully."); // Debugging log
}