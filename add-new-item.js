


// parses the string from local storage into an object
const currentPart = localStorage.getItem("emptyLocation");

function loadItemDetails() {
    document.getElementById("location").value = currentPart; 
}

loadItemDetails();
