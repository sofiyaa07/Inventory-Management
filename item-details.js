// btw this code breaks if you access item details BEFORE any of the list stuff


// parses the string from local storage into an object
const currentPart = JSON.parse(sessionStorage.getItem("currentPart"));
// receives currentPart as a plain object, properties have underscores before them


const serverLocation = `http://localhost:3000`;
let changedPart = currentPart; //assuming that name doesn't change (for now) = identify part by name


function saveChanges() {
    // changedPart.name = document.getElementById("name").textContent;
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
            partName: currentPart.name,
            body: JSON.stringify(changedPart),
        })
        
        window.alert("Changes saved!");

    }

    catch {
        window.alert("Error: Changes not saved");
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
