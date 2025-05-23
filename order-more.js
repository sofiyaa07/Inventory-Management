

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

// function loadOrderMorePage (Part) {

    document.getElementByClassName(".scrollable").innerHTML = ""; // clears previous list

    const container = document.querySelector('.scrollable-links');

    const part = part1;
    container.innerHTML = ""; // Clear the container

    // Create a row for the link
    const row = document.createElement('div');
    row.classList.add('link-row'); //put in link-row class

    const link = document.createElement('a'); //create link element
    link.href = part.storeLinks; // assign link to part's link 
    link.target = "_blank"; // Open the link in a new tab
    link.textContent = "Store Link"; //name link 

    const deleteButton = document.createElement('button'); //create buttone element 
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete'); //add to delete class

    const selectButton = document.createElement('button');
    selectButton.textContent = '✓';
    selectButton.classList.add('select'); //add to select class

    row.appendChild(link); //append link and buttons to row 
    row.appendChild(selectButton);
    row.appendChild(deleteButton);

    // container.appendChild(row); // Append row to container
    document.getElementByClassName(".scrollable-links").appendChild(a);

// }


loadOrderMorePage(part1);
