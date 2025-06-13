/*
* Scripts used in inventory-by-list.html
* Takes parts from partArray.js to fill out the html elements
* Ability to sort list, and easily check for low stock parts
*/

// need a part array to work
import { sortAlphaAsc, sortAlphaDesc, sortStockAsc, sortStockDesc, sortByName } from "./sortMethods.js";
import { parts, getPartArray } from "../partArray.js";

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
        const p = document.createElement("p");
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = sortedParts[i].imgSrc; // replace with parts[i].imgSrc
        const text = document.createTextNode(sortedParts[i].name);
        p.appendChild(text); // adds text to <p>
        div.appendChild(img) // adds img to <div>
        a.appendChild(div); // adds div to <a>
        a.appendChild(p); // adds text to <a>

        a.href = "#";
        // add event listener
        a.addEventListener("click", () => { // sets local storage current part
            sessionStorage.setItem("currentPart", JSON.stringify(sortedParts[i]));
            // stringify  sets the object to a string so it can be properly stored
            window.location.href = "../item-details.html"; // THEN redirects
        });

        document.getElementById("inv-list").appendChild(a);
    }

}

function refreshLowStock() {
    document.getElementById("low-stock-container").innerHTML = ""; // clears previous list

    for (let i = 0; i < parts.length; i++) {
        // creates an a element for each LOW-STOCK PART (diff array)
        if (parts[i].stock < parts[i].threshold) {
            const a = document.createElement("a");

            a.href = "#";
            // same as above
            a.addEventListener("click", () => { // sets local storage current part
                sessionStorage.setItem("currentPart", JSON.stringify(parts[i]));
                // stringify  sets the object to a string so it can be properly stored
                window.location.href = "../item-details.html"; // THEN redirects
            });



            // adds img src=part[i].image and the div that surrounds it
            const div = document.createElement("div");
            const img = document.createElement("img");
            div.appendChild(img);
            a.appendChild(div);
            img.src = parts[i].imgSrc;

            // adds text to a p, and then to the a
            const p = document.createElement("p");

            // this is different so the line break works (\n doesn't print in html)
            p.innerHTML = `${parts[i].name}<br>Stock: ${parts[i].stock}`;
            a.appendChild(p);

            // adds a to the low-stock div
            document.getElementById("low-stock-container").appendChild(a);
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

    getPartArray().then(() => {
        getAlphaAsc();
        refreshLowStock();
        
    }); // call at beginning to make sure array is updated



});