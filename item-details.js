// btw this code breaks if you access item details BEFORE any of the list stuff



// parses the string from local storage into an object
const currentPart = JSON.parse(localStorage.getItem("currentPart"));

function loadItemDetails() {
    document.getElementById("name").textContent = currentPart.name;
    document.getElementById("stock").value = currentPart.stock; 
    document.getElementById("threshold").value = currentPart.threshold; 
    document.getElementById("model").value = currentPart.model; 
    document.getElementById("location").value = currentPart.location; 
    document.getElementById("notes").textContent = currentPart.notes; 
    document.getElementById("image").src = currentPart.imgSrc; 
}

loadItemDetails();
