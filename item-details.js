/*
* Scripts for item-details.html
* Relies on sessionStorage to get parts to display
* Should ideally not be run without sessionStorage, but will not crash, just won't display anything
*/

import { getPartArray } from "../partArray.js";

// parses the string from local storage into an object
let currentPart = JSON.parse(sessionStorage.getItem("currentPart"));
let changedPart = {};

// receives currentPart as a plain object, properties have underscores before them


const serverLocation = `http://localhost:3000`;


function saveChanges() {
    const currStock = document.getElementById("stock").value;
    const currThreshold = document.getElementById("threshold").value;
    const currModel = document.getElementById("model").value;
    const currLocation = document.getElementById("location").value;
    const currNotes = document.getElementById("notes").value;
    const currImgSrc = document.getElementById("url-image-input").value;

    // super duper uber tedious comma checking because if they're included,
    // the CSV completely dies, and it has to be changed manually
    if (currStock.includes(",") || currThreshold.includes(",") || currModel.includes(",") ||
        currLocation.includes(",") || currNotes.includes(",") || currImgSrc.includes(",") || currStoreLinks.includes(",")) {
        window.alert("Please remove commas from input fields before saving");
    }
    else {
        changedPart.stock = currStock;
        changedPart.threshold = currThreshold;
        changedPart.model = currModel;
        changedPart.location = currLocation;
        changedPart.notes = currNotes;
        changedPart.imgSrc = currImgSrc;

        try {
            // fetch from backend server (if /update)
            fetch(`${serverLocation}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changedPart),
            })
                .then(response => response.json()) // parses data into object array (?)
                .then(data => {
                    // sets session storage, and then changes currentPart
                    sessionStorage.setItem("currentPart", JSON.stringify(data));
                    currentPart = data;
                    getPartArray();

                    window.alert("Changes saved!");

                    loadItemDetails(); // updates page


                    console.log("updated");
                })

        }
        catch (error) {
            window.alert("Error changing item info: ", error);

        }

    }

}

function loadItemDetails() { // just takes the part from local storage
    document.getElementById("name").textContent = currentPart._name;
    document.getElementById("stock").value = currentPart._stock;
    document.getElementById("threshold").value = currentPart._threshold;
    document.getElementById("model").value = currentPart._model;
    document.getElementById("location").value = currentPart._location;
    document.getElementById("notes").textContent = currentPart._notes;
    document.getElementById("image").src = currentPart._imgSrc;
    document.getElementById("url-image-input").value = currentPart._imgSrc;

}

document.addEventListener("DOMContentLoaded", () => { // waits until page is fully loaded
    // action listener for the search button
    document.getElementById("save-item-info").addEventListener("click", saveChanges);

    // load items
    loadItemDetails();

});
