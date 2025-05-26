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
import { parts, setCurrentPart } from "../partArray.js";  
import * as helpers from "../helper-methods.js";

let lowStockParts = [];
let sortedParts = [];


// sort options
function getAlphaAsc() {
    sortedParts = helpers.sortAlphaAsc(parts);
    refreshList();
}

function getAlphaDesc() {
    sortedParts = helpers.sortAlphaDesc(parts);
    refreshList();
}

function getStockAsc() {
    sortedParts = helpers.sortStockAsc(parts);
    refreshList();
}

function getStockDesc() {
    sortedParts = helpers.sortStockDesc(parts);
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
        // a.addEventListener("click", () => setCurrentPart(sortedParts[i])); // i can't test tihs yet

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
    document.getElementById("search-button").addEventListener("click", refreshList);

    // all the sort options
    document.getElementById("sort-alpha").addEventListener("click", getAlphaAsc);
    document.getElementById("sort-desc-alpha").addEventListener("click", getAlphaDesc);
    document.getElementById("sort-stock").addEventListener("click", getStockAsc);
    document.getElementById("sort-desc-stock").addEventListener("click", getStockDesc);

    getAlphaAsc();
    refreshLowStock();

});