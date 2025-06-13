// btw this code breaks if you access item details BEFORE any of the list stuff
import { getPartArray } from "../partArray.js";

// parses the string from local storage into an object
let currentPart = JSON.parse(sessionStorage.getItem("currentPart"));
let changedPart = {};

// receives currentPart as a plain object, properties have underscores before them


const serverLocation = `http://localhost:3000`;


function saveChanges() {
    changedPart.name = document.getElementById("name").textContent;
    changedPart.stock = document.getElementById("stock").value;
    changedPart.threshold = document.getElementById("threshold").value;
    changedPart.model = document.getElementById("model").value;
    changedPart.location = document.getElementById("location").value;
    changedPart.notes = document.getElementById("notes").textContent;
    changedPart.imgSrc = document.getElementById("image").src;


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


function loadItemDetails() { // just takes the part from local storage
    document.getElementById("name").textContent = currentPart._name;
    document.getElementById("stock").value = currentPart._stock;
    document.getElementById("threshold").value = currentPart._threshold;
    document.getElementById("model").value = currentPart._model;
    document.getElementById("location").value = currentPart._location;
    document.getElementById("notes").textContent = currentPart._notes;
    document.getElementById("image").src = currentPart._imgSrc;
}

document.addEventListener("DOMContentLoaded", () => { // waits until page is fully loaded
    // action listener for the search button
    document.getElementById("save-item-info").addEventListener("click", saveChanges);

    // load items
    loadItemDetails();

});
