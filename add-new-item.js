import Part from './part.js';
import { PORT } from "./backendServer.js";

// only does anything for inventory-by-location
const partLocation = localStorage.getItem("emptyLocation");
const serverLocation = `http://localhost:${PORT}`;

let currentPart = new Part;

function loadItemDetails() {
    document.getElementById("location").value = partLocation;
}

// takes all the info from the page into a new part on the csv
function addItem() {

    try {
        document.getElementById("name").textContent = currentPart.name;
        document.getElementById("stock").value = currentPart.stock;
        document.getElementById("threshold").value = currentPart.threshold;
        document.getElementById("model").value = currentPart.model;
        document.getElementById("location").value = currentPart.location;
        document.getElementById("notes").textContent = currentPart.notes;
        document.getElementById("imageInput").src = currentPart.imgSrc;
        document.getElementById("store-links").textContent = currentPart.storeLinks;

        // fetch info from the server (backendServer.js)
        fetch(serverLocation, {
            // sends the data to the serverLocation
            method: 'POST',
            body: JSON.stringify(currentPart),
        });

        window.alert("Changes saved!");


    }
    catch { // in case of file reading error
        window.alert("Error: Changes not saved");

    }

}


document.addEventListener("DOMContentLoaded", () => {
    loadItemDetails();

    document.getElementById("save-item-info").addEventListener("click", addItem);

});