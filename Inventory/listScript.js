// need a part array to work

let parts = [
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]", stock: "10" },

];

let lowStockParts = [];


// // Read in CSV file (CSV -> str -> obj)
// const csvPath = './Part Database - Sheet1.csv';
// async function loadParts() {
//     try {
//         const csvFile = await fetch(csvPath);
//         const csvString = await csvFile.text();
//         console.log('CSV read.');

//         // Separate CSV string into key value pairs 
//         parts = helpers.csvToObjects(csvString);

//     } catch (err) {
//         console.error('Error reading file: ', err);
//     }
// }


// action listener for the search button
document.getElementById("search-button").addEventListener("click", refreshList);

// inventory-by-list
function refreshList() {
    document.getElementById("inv-list").innerHTML = ""; // clears previous list

    for (let i = 0; i < parts.length; i++) {
        // creates a new element, then adds it to inv-list

        // creates a link, and an img. adds img to the link, the adds link to the list
        const a = document.createElement("a");
        a.href = "../item-details.html";
        const p = document.createElement("p");
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = "../Arduino.jpg" // replace with parts[i].img, or whatever it's called
        const text = document.createTextNode(parts[i].name);
        p.appendChild(text); // adds text to <p>
        div.appendChild(img) // adds img to <div>
        a.appendChild(div); // adds div to <a>
        a.appendChild(p); // adds text to <a>
        document.getElementById("inv-list").appendChild(a);
    }

}

function refreshLowStock() {
    document.getElementById("low-stock").innerHTML = ""; // clears previous list
    fillLowStockArray();

    for (let i = 0; i < lowStockParts.length; i++) {
        // creates an a element for each LOW-STOCK PART (diff array)
        const a = document.createElement("a");
        a.href = "../item-details.html";

        // adds img src=part[i].image and the div that surrounds it
        const div = document.createElement("div");
        const img = document.createElement("img");
        div.appendChild(img);
        a.appendChild(div);
        img.src = "../Arduino.jpg";

        // adds text to a p, and then to the a
        const p = document.createElement("p");

        // this is different so the line break works (\n doesn't print in html)
        p.innerHTML = `${lowStockParts[i].name}<br>Stock: ${lowStockParts[i].stock}`;        
        a.appendChild(p);

        // adds a to the low-stock div
        document.getElementById("low-stock").appendChild(a);
    }

}

function fillLowStockArray() { // fills the lowStockParts array
    let counter = 0;

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].stock < 5) {
            lowStockParts[counter] = parts[i];
            counter++;
        }
    }
}

// start of document scripts
refreshList();
refreshLowStock();
