// btw this code breaks if you access item details BEFORE any of the list stuff
import { parts } from "./partArray.js";


// parses the string from local storage into an object
const currentPart = JSON.parse(localStorage.getItem("currentPart"));
let changedPart = {};

function saveChanges() {
    changedPart.name = document.getElementById("name").textContent;
    changedPart.stock = document.getElementById("stock").value;
    changedPart.threshold = document.getElementById("threshold").value;
    changedPart.model = document.getElementById("model").value;
    changedPart.location = document.getElementById("location").value;
    changedPart.notes = document.getElementById("notes").textContent;
    changedPart.imgSrc = document.getElementById("image").src;

    changePartInDatabase();
}

function changePartInDatabase() {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == currentPart) {
            parts[i] = changedPart;

            // remove parts[i] from csv
            // append changedPart
        }
    }

    

    window.alert("Changes saved!");
}


function loadItemDetails() {
    const name = currentPart.name; 
    document.getElementById("name").textContent = name.substring(0, name.indexOf(','));
    document.getElementById("stock").value = currentPart.stock; 
    document.getElementById("threshold").value = currentPart.threshold; 
    document.getElementById("model").value = name.substring(name.indexOf(',')+1); 
    document.getElementById("location").value = currentPart.location; 
    document.getElementById("notes").textContent = currentPart.notes; 
    document.getElementById("image").src = currentPart.imgSrc; 
}

document.addEventListener("DOMContentLoaded", () => { // waits until page is fully loaded
    // action listener for the search button
    document.getElementById("save-item-info").addEventListener("click", saveChanges);

    // load items
    loadItemDetails();

});
