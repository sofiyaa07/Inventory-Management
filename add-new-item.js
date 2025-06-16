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
    const currName = document.getElementById("name").value;
    const currStock = document.getElementById("stock").value;
    const currThreshold = document.getElementById("threshold").value;
    const currModel = document.getElementById("model").value;
    const currLocation = document.getElementById("location").value;
    const currNotes = document.getElementById("notes").value;
    const currImgSrc = document.getElementById("url-image-input").value;
    const currStoreLinks = document.getElementById("store-links").value;

    // super duper uber tedious comma checking because if they're included,
    // the CSV completely dies, and it has to be changed manually
    if (currName.includes(",") || currStock.includes(",") || currThreshold.includes(",") || currModel.includes(",") ||
        currLocation.includes(",") || currNotes.includes(",") || currImgSrc.includes(",") || currStoreLinks.includes(",")) {
        window.alert("Please remove commas from input fields before saving");
    }
    else {
        currentPart.name = currName;
        currentPart.stock = currStock;
        currentPart.threshold = currThreshold;
        currentPart.model = currModel;
        currentPart.location = currLocation;
        currentPart.notes = currNotes;
        currentPart.imgSrc = currImgSrc;
        currentPart.storeLinks = currStoreLinks;

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



}




document.addEventListener("DOMContentLoaded", () => {
    loadItemDetails();
    document.getElementById("save-item-info").addEventListener("click", saveItemInfo);

});