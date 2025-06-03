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
        currentPart.name = document.getElementById("name").textContent
        currentPart.stock = document.getElementById("stock").value;
        currentPart.threshold = document.getElementById("threshold").value;
        currentPart.model = document.getElementById("model").value;
        currentPart.location = document.getElementById("location").value;
        currentPart.notes = document.getElementById("notes").textContent;
        currentPart.imgSrc = document.getElementById("imageInput").src;
        currentPart.storeLinks = document.getElementById("store-links").textContent;

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

    loadItemDetails();



document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("save-item-info").addEventListener("click", addItem);

});