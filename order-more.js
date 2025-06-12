
// The way this is set up, all getters have to be called with an underscore in front
// -> because it's being passed as a plain object, the getters and setters from part.js
// don't work
// ex. currentPart.name doesn't work, currentPart._name does
const currentPart = JSON.parse(sessionStorage.getItem("currentPart"));
const serverLocation = 'http://localhost:3000';



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
    const submitButton = document.querySelector('.submit-link input[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            const newLinkInput = document.getElementById('addLink'); // Get user input
            if (newLinkInput.value) {
                try {
                    //add code to update array; 

                    const domain = new URL(newLinkInput.value).hostname.replace('www.', ''); // Extract domain
                    const newRow = createLinkRow(newLinkInput.value, domain); // Create new row
                    const container = document.querySelector('.scrollable-links');

                    const noLinksMessage = container.querySelector('.no-links-message'); //if "no links" is displayed, remove message when submitting a new link
                    if (noLinksMessage) {
                        noLinksMessage.remove();
                    }

                    container.appendChild(newRow); // Add new row to container
                    newLinkInput.value = ""; // Clear input field

                    // Add buttons
                    selectButton();
                    deleteButton();
                } catch (e) {
                    alert("Please enter a valid URL."); // Alert for invalid input
                }
            }
        });
    }
}

function selectButton() {
    const selectButtons = document.querySelectorAll(".select");

    selectButtons.forEach(button => {
        button.addEventListener("click", function () {
            const quantity = prompt("How many would you like to order?");
            if (quantity && !isNaN(quantity) && Number(quantity) > 0) {
                alert(`You've ordered ${quantity} of this item! Forwarding to receiving tab...`);
                // creates a new object out of item info

                let orderedPart = {};

                orderedPart.name = currentPart._name;
                orderedPart.quantity = quantity;
                orderedPart.imgSrc = currentPart._imgSrc;

                const date = new Date();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                const dateOrdered = `${day}-${month}-${year}`;

                orderedPart.orderedDate = dateOrdered;


                writeToIncomingOrders(orderedPart);
                window.location.href = "receiving.html"; // Redirect to receiving tab
            } else if (quantity !== null) {
                alert("Please enter a valid number.");
            }
        });
    });
}

function deleteButton() {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const confirmDelete = confirm("Are you sure you want to delete this link?");
            if (confirmDelete) {
                const linkRow = button.closest(".link-row"); // Get the specific row containing the button
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

    if (part._storeLinks && part._storeLinks.length > 0) {
        part._storeLinks.forEach(linkUrl => {
            const row = createLinkRow(linkUrl); // Create row for each link
            container.appendChild(row); // Add row to container
        });
    } else {
        const noLinksMessage = document.createElement('p');
        noLinksMessage.textContent = "No store links available.";
        noLinksMessage.classList.add('no-links-message'); // Optional: Add a class for styling
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
    loadOrderMorePage(currentPart); // Load part1 data
});
