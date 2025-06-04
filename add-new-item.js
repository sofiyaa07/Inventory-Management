import Part from './part.js';

// only does anything for inventory-by-location
const placement = localStorage.getItem("emptyLocation");
const PORT = 3000;
const serverLocation = `http://localhost:${PORT}`;

let currentPart = new Part;

function loadItemDetails() {
    document.getElementById("location").value = placement;
    console.log(placement);
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
        fetch(`${serverLocation}/save`, {
            // sends the data to the serverLocation
            method: 'POST',
            headers: { // i have no idea what this does but i was told to add it
                'Content-Type': 'application/json'
            },
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