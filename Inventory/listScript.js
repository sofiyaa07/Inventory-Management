/* things to add:
    - need to get search bar working
        - most likely, when search is clicked, takes the text from the field,
        and using that makes a new array with only parts that have whatever's
        in the text field as name.
        - therefore, need new "refresh page" function that takes an array
        - array is by default, "get array from helpers", but changes depending
        on sort method (default is alphabetical), or search


*/

// need a part array to work
import { setCurrentPart } from "../partArray.js";  // import parts here (but not now because testing)
import { sortAlphaAsc, sortAlphaDesc, sortStockAsc, sortStockDesc, sortByName } from "./sortMethods.js";


let parts = [ // TEMP ARRAY
    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-0[0][0]", stock: 1 },
    { name: "Brduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: 2 },
    { name: "Crduino Uno REV3,ARD_A000066", location: "shelf-0[2][0]", stock: 3 },
    { name: "Drduino Uno REV3,ARD_A000066", location: "shelf-0[3][0]", stock: 4, threshold: 5 },
    { name: "Erduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: 5, threshold: 5 },
    { name: "Frduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: 6 },
    { name: "Grduino Uno REV3,ARD_A000066", location: "shelf-0[2][0]", stock: 7 },
    { name: "Hrduino Uno REV3,ARD_A000066", location: "shelf-0[3][0]", stock: 8 },
    { name: "Irduino Uno REV3,ARD_A000066", location: "shelf-0[0][2]", stock: 20 },
    { name: "Jrduino Uno REV3,ARD_A000066", location: "shelf-0[0][2]", stock: 9 },
    { name: "Krduino Uno REV3,ARD_A000066", location: "shelf-0[2][2]", stock: 100 },
    { name: "Lrduino Uno REV3,ARD_A000066", location: "shelf-0[3][2]", stock: 41 },
    { name: "Mrduino Uno REV3,ARD_A000066", location: "shelf-0[0][3]", stock: 42 },
    { name: "Nrduino Uno REV3,ARD_A000066", location: "shelf-0[0][3]", stock: 43 },
    { name: "Orduino Uno REV3,ARD_A000066", location: "shelf-0[2][3]", stock: 44 },
    { name: "Prduino Uno REV3,ARD_A000066", location: "shelf-0[3][3]", stock: 45 },
    { name: "Qrduino Uno REV3,ARD_A000066", location: "shelf-0[0][4]", stock: 46 },
    { name: "Rrduino Uno REV3,ARD_A000066", location: "shelf-0[3][4]", stock: 47 },
    { name: "Srduino Uno REV3,ARD_A000066", location: "shelf-0[2][5]", stock: 48 },
    { name: "Trduino Uno REV3,ARD_A000066", location: "shelf-0[0][7]", stock: 49 },
];
let lowStockParts = [];
let sortedParts = [];


// sort options
function getAlphaAsc() {
    sortedParts = sortAlphaAsc(parts);
    refreshList();
}

function getAlphaDesc() {
    sortedParts = sortAlphaDesc(parts);
    refreshList();
}

function getStockAsc() {
    sortedParts = sortStockAsc(parts);
    refreshList();
}

function getStockDesc() {
    sortedParts = sortStockDesc(parts);
    refreshList();
}

function getSearchList() {
    const query = document.getElementById("search-bar").value;
    sortedParts = sortByName(parts, query);
    refreshList();
}


// inventory-by-list
function refreshList() {
    document.getElementById("inv-list").innerHTML = ""; // clears previous list

    for (let i = 0; i < sortedParts.length; i++) {
        // creates a new element, then adds it to inv-list

        // creates a link, and an img. adds img to the link, the adds link to the list
        const a = document.createElement("a");
        a.href = "../item-details.html";
        const p = document.createElement("p");
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = "../Arduino.jpg" // replace with parts[i].img, or whatever it's called
        const text = document.createTextNode(sortedParts[i].name);
        p.appendChild(text); // adds text to <p>
        div.appendChild(img) // adds img to <div>
        a.appendChild(div); // adds div to <a>
        a.appendChild(p); // adds text to <a>

        // add event listener
        a.addEventListener("click", () => setCurrentPart(sortedParts[i])); // i can't test tihs yet

        document.getElementById("inv-list").appendChild(a);
    }

}

function refreshLowStock() {
    document.getElementById("low-stock-container").innerHTML = ""; // clears previous list
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
        document.getElementById("low-stock-container").appendChild(a);
    }

}

function fillLowStockArray() { // fills the lowStockParts array
    let counter = 0;

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].stock < parts[i].threshold) {
            lowStockParts[counter] = parts[i];
            counter++;
        }
    }

}


// start of document scripts
document.addEventListener("DOMContentLoaded", () => { // waits until page is fully loaded
    // action listener for the search button
    document.getElementById("search-button").addEventListener("click", getSearchList);

    // // all the sort options
    document.getElementById("sort-alpha").addEventListener("click", getAlphaAsc);
    document.getElementById("sort-desc-alpha").addEventListener("click", getAlphaDesc);
    document.getElementById("sort-stock").addEventListener("click", getStockAsc);
    document.getElementById("sort-desc-stock").addEventListener("click", getStockDesc);

    getAlphaAsc();
    refreshLowStock();

});