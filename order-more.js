/*
* Scripts for order-more.html
* Uses sessionStorage to get info on part to be viewed
* Allows adding and removing of links, and redirects to receiving page automatically
* On above point: if it's better removed, remove this line of code in "selectButton()": window.location.href = "receiving.html";
*/


// The way this is set up, all getters have to be called with an underscore in front
// -> because it's being passed as a plain object, the getters and setters from part.js
// don't work
// ex. currentPart.name doesn't work, currentPart._name does
let currentPart = JSON.parse(sessionStorage.getItem("currentPart"));
const serverLocation = 'http://localhost:3000';
let changedPart = {};
changedPart.name = currentPart._name;
import { getPartArray } from "./partArray.js";


//NEEDS TO REMOVE IN DATABASE WHEN DELETING A LINK 

function createLinkRow(linkUrl, linkName = "Store Link") {
    const row = document.createElement('div'); // Create div element
    row.classList.add('link-row'); // Add to link-row class

    const link = document.createElement('a'); // Create link element
    link.href = linkUrl; // Set link address to linkUrl
    link.target = "_blank"; // Open in new tab
    link.textContent = linkName; // Set text of link to linkName

    // Extract domain for cleaner display
    try {
        const domain = new URL(linkUrl).hostname.replace('www.', ''); // Remove www. from link
        link.textContent = domain; // Set text to domain
    } catch (e) {
        link.textContent = linkName;
    }

    const selectButton = document.createElement('button'); // Create select button
    selectButton.textContent = '✓';
    selectButton.classList.add('select'); // Add to select class
    selectButton.title = 'Select link'; // Set title
    selectButton.setAttribute('selectedStore', linkUrl);  //stores linkUrl in button to access later

    const deleteButton = document.createElement('button'); // Create delete button
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete'); // Add to delete class
    deleteButton.title = 'Delete link'; // Set title

    // Add link and buttons to row
    row.appendChild(link);
    row.appendChild(selectButton);
    row.appendChild(deleteButton);

    return row;
}

function submitButton() {
    const submitButton = document.querySelector('.submit-link input[type="submit"]'); //assign submit button to submit link form 
    if (submitButton) {
        submitButton.addEventListener('click', () => { //add click listener to button 
            const newLinkInput = document.getElementById('addLink'); // Get user input
            //newLinkInput is the site URL 
            if (newLinkInput.value) { //if there is a value in the input
                try {

                    //add code to update array; 

                    const domain = new URL(newLinkInput.value).hostname.replace('www.', ''); // Extract domain from link
                    const newRow = createLinkRow(newLinkInput.value, domain); // Create new row, passing url and domain 
                    const container = document.querySelector('.scrollable-links'); //assign container to scrollable-links div 

                    const noLinksMessage = container.querySelector('.no-links-message'); //if "no links" is displayed, remove message after submitting a link
                    if (noLinksMessage) {
                        noLinksMessage.remove();
                    }

                    container.appendChild(newRow); // Add new row to container

                    // Add button functions 
                    selectButton();
                    deleteButton();


                    // only does something if the link is valid
                    // backend stuff -----------------------------------------------------------------------------------
                    // assigns name and storeLinks (only things necessary)

                    // concatenates currentPart's store links and the new link
                    changedPart.storeLinks = []
                    changedPart.storeLinks.push(...currentPart._storeLinks);
                    changedPart.storeLinks.push(newLinkInput.value);


                    try {
                        // fetch from backend server (if /update)
                        fetch(`${serverLocation}/update-links`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(changedPart),
                        })
                            .then(response => response.json()) // parses data into object array (?)
                            .then(data => { // data returns as a properly formatted OBJECT

                                // sets session storage, and then changes currentPart
                                sessionStorage.setItem("currentPart", JSON.stringify(data));
                                currentPart = data;
                                getPartArray();
                                window.alert("Changes saved!");
                                loadOrderMorePage(); // updates page

                                console.log("updated");
                            })

                    } // end of try
                    catch (error) {
                        window.alert("Error changing item info: ", error);

                    }

                    newLinkInput.value = ""; // Clear input field after everything



                } catch (e) {
                    alert("Please enter a valid URL."); // Alert for invalid input
                }
            }




        });



    }
}

function selectButton() {
    const selectButtons = document.querySelectorAll(".select"); //assign selectButtons to elements with class "select" 

    selectButtons.forEach(button => {
        button.addEventListener("click", function () { //add click listener to buttons 
            const quantity = prompt("How many would you like to order?"); //ask user for quantity of order
            if (quantity && !isNaN(quantity) && Number(quantity) > 0) { //if user inputs number and it is greater than 0, outputs 
                alert(`You've ordered ${quantity} of this item! Forwarding to receiving tab...`);
                // creates a new object out of item info

                let orderedPart = {};

                orderedPart.name = currentPart._name;
                orderedPart.quantity = quantity;
                orderedPart.imgSrc = currentPart._imgSrc;
                orderedPart.selectedStore = button.getAttribute('selectedStore'); //retrieves store link in row containing clicked btton, stores in orderedPart

                //get date of order
                const date = new Date();
                let day = date.getDate(); //get day, month, year and format 
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                const dateOrdered = `${day}-${month}-${year}`;

                orderedPart.orderedDate = dateOrdered; //assign to part 

                writeToIncomingOrders(orderedPart); //write to receiving page 
                window.location.href = "receiving.html"; // Redirect to receiving tab
            } else if (quantity !== null) {
                alert("Please enter a valid number."); //if quantity is not a number and not null, outputs error 
            }
        });
    });
}

//NEEDS TO REMOVE FROM DATABASE WHEN REMOVING A LINK  
function deleteButton() {
    const deleteButtons = document.querySelectorAll(".delete"); //assign deleteButtons to elements under class "delete"

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () { //add click listener to buttons  
            const confirmDelete = confirm("Are you sure you want to delete this link?"); //ask user to confirm deletion 
            if (confirmDelete) {
                const linkRow = button.closest(".link-row"); // Get the specific row containing the button

                // turns the rows into an array, then checks for which row was clicked
                const allRows = Array.from(document.querySelectorAll(".link-row"));
                const linkIndex = allRows.indexOf(linkRow);

                // adds all the store links not excluded to the chnagedPart
                // (underscore is for the element at the index, it's not used)
                changedPart.storeLinks = currentPart._storeLinks.filter((_, index) => index !== linkIndex);

                // server shenanigans
                try {
                    fetch(`${serverLocation}/update-links`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(changedPart)
                    })
                        .then(response => response.json()) // parses data into object array (?)
                        .then(data => { // data returns as a properly formatted OBJECT

                            // sets session storage, and then changes currentPart
                            sessionStorage.setItem("currentPart", JSON.stringify(data));
                            currentPart = data;
                            getPartArray();

                            window.alert("Changes saved!");

                            loadOrderMorePage(); // updates page




                            console.log("updated");
                        })

                }
                catch (error) {
                    window.alert("Error changing item info: ", error);

                }


                linkRow.remove(); // Remove row
            }
        });
    });
}

function loadOrderMorePage(part) {

    document.getElementById("image").src = part._imgSrc; // Set image source
    document.getElementById("name").textContent = part._name; // Set name

    const container = document.querySelector('.scrollable-links'); // Get scrollable-links container
    container.innerHTML = ""; // Clear existing content

    if (part._storeLinks && part._storeLinks.length > 0) { //if part has store links, 
        part._storeLinks.forEach(linkUrl => {
            const row = createLinkRow(linkUrl); // Create row for each link
            container.appendChild(row); // Add row to container
        });
    } else { //if part doesn't have store links, display "no links available" until user inputs one 
        const noLinksMessage = document.createElement('p');
        noLinksMessage.textContent = "No store links available.";
        noLinksMessage.classList.add('no-links-message');
        container.appendChild(noLinksMessage);
    }

    // Call button functions
    submitButton();
    selectButton();
    deleteButton();
}

function writeToIncomingOrders(orderedPart) {
    console.log(orderedPart);

    try {
        // fetch info from the server (backendServer.js)
        fetch(`${serverLocation}/add-incoming-order`, {
            // sends the data to the serverLocation
            method: 'POST',
            headers: { // i have no idea what this does but i was told to add it
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderedPart),
        });

        window.alert("Changes saved!");


    }
    catch { // in case of file reading error
        window.alert("Error: Changes not saved");

    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(currentPart);
    loadOrderMorePage(currentPart); // Load part1 data
});
