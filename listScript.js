// Import Part class and helper functions
// import { readFile } from 'fs/promises'; <-- supposedly node ONLY, not browser
// import * as helpers from './helper-methods.js';
// import Part from './part.js';

let parts = [
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf1[0][0]" }

]

// // Read in CSV file (CSV -> str -> obj)
// const csvPath = './Part Database - Sheet1.csv';
// async function loadParts() {
//     try {
//         const csvFile = await fetch(csvPath);
//         const csvString = await csvFile.text();
//         console.log('CSV read.');

//         // Separate CSV string into key value pairs 
//         parts = helpers.csvToObjects(csvString);

//     } catch (err) {
//         console.error('Error reading file: ', err);
//     }
// }


// action listener for the search button
// document.getElementById("search-button").onclick = refreshList();

// inventory-by-list
function refreshList() {
    document.getElementById("inv-list").innerHTML = ""; // clears previous list

    for (let i = 0; i < parts.length; i++) {
        // creates a new element, then adds it to inv-list

        // creates a link, and an img. adds img to the link, the adds link to the list
        const indLink = document.createElement("a");
        indLink.href = "#"; // replace with the parts page
        const pInLink = document.createElement("p");
        const div = document.createElement("div");
        const imgInLink = document.createElement("img");
        imgInLink.src = "Arduino.jpg" // replace with parts[i].img, or whatever it's called
        const text = document.createTextNode(parts[i].name);
        pInLink.appendChild(text); // adds text to <p>
        div.appendChild(imgInLink) // adds img to <div>
        indLink.appendChild(div); // adds div to <a>
        indLink.appendChild(pInLink); // adds text to <a>
        document.getElementById("inv-list").appendChild(indLink);
    }

}
