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
    changedPart.imsSrc = document.getElementById("image").src;

    try {
        // fetch from backend server (if /update)
        fetch(`${serverLocation}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            partName: currentPart.name,
            body: JSON.stringify(changedPart),
        })
        
        window.alert("Changes saved!");

    }

    catch {
        window.alert("Error: Changes not saved");
    }

}


function loadItemDetails() {
    document.getElementById("name").textContent = currentPart.name;
    document.getElementById("stock").value = currentPart.stock; 
    document.getElementById("threshold").value = currentPart.threshold; 
    document.getElementById("model").value = currentPart.model; 
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
