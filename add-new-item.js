/*
* Scripts used in add-new-item.html
* Takes information put into html elements, makes a Part out of them, and ships it to backend
*/


import Part from './part.js';
import { getPartArray } from './partArray.js';

// only does anything for inventory-by-location
const placement = sessionStorage.getItem("emptyLocation");
const serverLocation = `http://localhost:3000`;

let currentPart = new Part;

function loadItemDetails() {
    document.getElementById("location").value = placement;
    console.log(placement);
}

// takes all the info from the page into a new part on the csv
function saveItemInfo() {
    currentPart.name = document.getElementById("name").value;
    currentPart.stock = document.getElementById("stock").value;
    currentPart.threshold = document.getElementById("threshold").value;
    currentPart.model = document.getElementById("model").value;
    currentPart.location = document.getElementById("location").value;
    currentPart.notes = document.getElementById("notes").value;
    currentPart.imgSrc = document.getElementById("url-image-input").value;
    currentPart.storeLinks = document.getElementById("store-links").value;

    console.log(currentPart);

    try { 

        // fetch info from the server (backendServer.js)
        fetch(`${serverLocation}/save`, {
            // sends the data to the serverLocation
            method: 'POST',
            headers: { // i have no idea what this does but i was told to add it
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentPart),
        });

        window.alert("Changes saved!");

        getPartArray();

    }
    catch { // in case of file reading error
        window.alert("Error: Changes not saved");

    }

}




document.addEventListener("DOMContentLoaded", () => {
    loadItemDetails();
    document.getElementById("save-item-info").addEventListener("click", saveItemInfo);

});