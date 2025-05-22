let part = { name: "Arduino Uno REV3 (test)", model:"ARD_A000066", location: "shelf-5[0][4]", stock: "4", threshold: "5", notes: "blahblahblah" };

function addInfoToPage() {
    document.getElementById("name").innerHTML = part.name;
    document.getElementById("model").value = part.model;
    document.getElementById("stock").value = part.stock;
    document.getElementById("location").value = part.location;
    document.getElementById("threshold").value = part.threshold;
    document.getElementById("notes").value = part.notes;
}


addInfoToPage();