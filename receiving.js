let incomingOrders = [] // TEMP ARRAY;

const serverLocation = 'http://localhost:3000';

function createReceivingRow(incomingOrder) {
    const row = document.createElement('div');
    row.classList.add('item-row');

    const image = document.createElement('img');
    image.src = incomingOrder.imgSrc;
    row.appendChild(image);

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    const name = document.createElement('label');
    name.classList.add('name');
    name.textContent = "(Incoming: " + incomingOrder.quantity + ") " + incomingOrder.name;
    itemDetails.appendChild(name);

    const orderedDate = document.createElement('label');
    orderedDate.textContent = "Ordered: " + incomingOrder.orderedDate; // Set ordered date text
    orderedDate.classList.add('ordered-date');
    itemDetails.appendChild(orderedDate);

    row.appendChild(itemDetails);

    const receivedButton = document.createElement('button');
    receivedButton.textContent = "Received";
    receivedButton.classList.add('received');
    receivedButton.title = 'Confirm order received';
    row.appendChild(receivedButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add('cancel');
    cancelButton.title = 'Cancel order';
    row.appendChild(cancelButton);

    return row; // Return the created row
}

function receivedButton() {
    const receivedButtons = document.querySelectorAll(".received");

    receivedButtons.forEach(button => {
        button.addEventListener("click", function () {
            const orderConfirmed = confirm("Confirm order received and move to history?"); // Confirmation window
            if (orderConfirmed) {
                const itemRow = button.closest(".item-row"); // Get the specific row containing the button
                itemRow.remove(); // Remove row
                alert("Order marked as received.");
                //WRITE TO DATABASE!!!!!!!! (WITH DATE)

                let arrivedPart = {};
                arrivedPart.name = "banana"
                    arrivedPart.quantity = "123"
                    arrivedPart.imgSrc = "banana.avif"
                    arrivedPart.orderedDate = "Tuesday"
                    // arrivedPart.receivedDate = today's date
                    arrivedPart.status = "received";


                try {
                    // fetch info from the server (backendServer.js)
                    fetch(`${serverLocation}/ordered`, {
                        // sends the data to the serverLocation
                        method: 'POST',
                        headers: { // i have no idea what this does but i was told to add it
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(arrivedPart),
                    });

                    window.alert("Changes saved!");


                }
                catch { // in case of file reading error
                    window.alert("Error: Changes not saved");

                }
            }
        });
    });
}

function cancelButton() {
    const cancelButtons = document.querySelectorAll(".cancel");

    cancelButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemRow = button.closest(".item-row"); // Get the specific row containing the button
            const confirmDelete = confirm("Are you sure you want to cancel this order?"); // Confirmation window
            if (confirmDelete) {
                itemRow.remove(); // Remove row
                alert("Order cancelled.");
                //WRITE TO DATABASE!!!!!!!! (WITH DATE)
            }
        });
    });
}

function loadReceivingPage(incomingOrder) {
    const container = document.querySelector('.item-row-container'); // Get item-row-container
    container.innerHTML = ""; // Clear existing content

    incomingOrder.forEach(order => {
        const row = createReceivingRow(order); // Create row for each incoming order
        container.appendChild(row); // Add row to container
    });

    // Call button functions
    receivedButton();
    cancelButton();
}

function getIncomingOrders() {
    return fetch(`${serverLocation}/incoming-orders`) // returns a promise (feedback)
        .then(response => response.json()) // parses data into object array (?)
        .then(data => {
            // sets parts to nothing, then adds
            incomingOrders.length = 0;
            incomingOrders.push(...data); // ... takes each item in array and uses the function on it
            // (kinda like a loop, but simplified)

            console.log("order history updated", incomingOrders);
        })

        // error handling
        .catch(error => {
            console.error("Error fetching array:", error);
        });

}

document.addEventListener("DOMContentLoaded", () => {

    getIncomingOrders().then(() => {
        loadReceivingPage(incomingOrders) // Load receiving page with incoming orders

    });
});
