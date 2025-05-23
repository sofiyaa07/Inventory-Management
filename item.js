
import Part from './part.js';

const part1 = new Part(
    "Arduino Mega 2560",
    "ARD_A000067",
    "shelf2[1][0]",
    10, //stock 
    "Important part", //notes
    ["https://store.arduino.cc"], //link
    "arduinoMega.jpg", //picture
    3
);

let parts = [
    part1 
]

function loadItemDetails(Part) {
    const i = 0; 
    document.getElementById("name").textContent = parts[i].name; 
    document.getElementById("stock").value = parts[i].stock; 
    document.getElementById("threshold").value = parts[i].threshold; 
    document.getElementById("model").value = parts[i].model; 
    document.getElementById("location").value = parts[i].location; 
    document.getElementById("notes").textContent = parts[i].notes; 
    document.getElementById("image").src = parts[i].imgSrc; 
}


loadItemDetails(part1);
// loadOrderMorePage(part1);



// let parts = [
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "4", threshold: 5, notes: "cool"},
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "4" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "4" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "4" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },
//     { name: "Arduino Uno REV3", model: "ARD_A000066", location: "shelf1[0][0]", stock: "10" },

// ];

// document.getElementById("name").textContent = parts[0].name; // Use textContent for <h2>
// document.getElementById("stock").value = parts[0].stock; 
// document.getElementById("threshold").value = parts[0].threshold; 
// document.getElementById("model").value = parts[0].model; 
// document.getElementById("location").value = parts[0].location; 
// document.getElementById("notes").textContent = parts[0].notes; 

