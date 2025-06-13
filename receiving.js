let incomingOrders = [] // TEMP ARRAY;

const serverLocation = 'http://localhost:3000';

function createReceivingRow(incomingOrder) {
    const row = document.createElement('div'); //create row to display order info 
    row.classList.add('item-row');

    //rest of elements 
    const image = document.createElement('img');
    image.src = incomingOrder.imgSrc;
    row.appendChild(image);

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    const name = document.createElement('label');
    name.classList.add('name');
    name.textContent = "(Incoming: " + incomingOrder.quantity + ") " + incomingOrder.name; //display order name and quantity 
    itemDetails.appendChild(name);

    const orderedDate = document.createElement('label');
    orderedDate.textContent = "Ordered: " + incomingOrder.orderedDate; // Display ordered date 
    orderedDate.classList.add('ordered-date');
    itemDetails.appendChild(orderedDate);

    row.appendChild(itemDetails);

    const receivedButton = document.createElement('button'); //create button to indicate order received
    receivedButton.textContent = "Received";
    receivedButton.classList.add('received');
    receivedButton.title = 'Confirm order received';

    //store info (name, quantity, image url, ordered date) from the part in current row in received button 
    //allows info to be passed to order history after button is clicked 
    receivedButton.setAttribute('data-name', incomingOrder.name);
    receivedButton.setAttribute('data-quantity', incomingOrder.quantity);
    receivedButton.setAttribute('data-image', incomingOrder.imgSrc);
    receivedButton.setAttribute('data-ordered-date', incomingOrder.orderedDate);
    receivedButton.setAttribute('data-selected-store', incomingOrder.selectedStore); 

    row.appendChild(receivedButton);

    //create cancel order button 
    const cancelButton = document.createElement('button');
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add('cancel');
    cancelButton.title = 'Cancel order';

    //store part data in button 
    cancelButton.setAttribute('data-name', incomingOrder.name);
    cancelButton.setAttribute('data-quantity', incomingOrder.quantity);
    cancelButton.setAttribute('data-image', incomingOrder.imgSrc);
    cancelButton.setAttribute('data-ordered-date', incomingOrder.orderedDate);
    cancelButton.setAttribute('data-selected-store', incomingOrder.selectedStore); 

    row.appendChild(cancelButton);

    return row; // Return the created row
}

function receivedButton() {
    const receivedButtons = document.querySelectorAll(".received"); //assign receivedButtons to all elements with class name "received"

    receivedButtons.forEach(button => { //repeat for each button
        button.addEventListener("click", function () { //add click listener to received buttons 

            //retrieve data from part in the row containing clicked button 
            const partName = button.getAttribute('data-name'); 
            const partQuantity = button.getAttribute('data-quantity'); 
            const partImage = button.getAttribute('data-image'); 
            const partOrderDate = button.getAttribute('data-ordered-date'); 
            const partStore = button.getAttribute('data-selected-store'); 
            const status = "received"; //change order status to received
            
            //format date of reception 
            let day = date.getDate(); 
            let month = date.getMonth() + 1; 
            let year = date.getFullYear(); 
            const receivedDate = `${day}-${month}-${year}`;

            const orderConfirmed = confirm(`Confirm order received for ${partQuantity}x ${partName} and move to history?`); // Confirmation window
            if (orderConfirmed) { //if user confirms order 
                const itemRow = button.closest(".item-row"); // Get the specific row containing the button
                itemRow.remove(); // Remove row
                alert(`Order for ${partName} marked as received.`);

                //WRITE TO DATABASE!!!!!!!! (WITH DATE)

                //set values from part in row containing button clicked to arrivedPart
                let arrivedPart = {};
                arrivedPart.name = partName;
                arrivedPart.quantity = partQuantity;
                arrivedPart.imgSrc = partImage;
                arrivedPart.orderedDate = partOrderDate;
                arrivedPart.receivedDate = receivedDate; 
                arrivedPart.selectedStore = partStore; 
                arrivedPart.status = status;

                addToOrderHistory(arrivedPart); //pass arrivedPart to order history
                removeFromIncomingOrders(arrivedPart); //remove this part from receiving page

            }
        });
    });
}

//this function is pretty much the same as receivedButton but asks to confirm cancellation and sets status to cancelled before passing to order history 
function cancelButton() {
    const cancelButtons = document.querySelectorAll(".cancel"); //assign cancelButtons to all elements with class name "cancel"

    cancelButtons.forEach(button => { //add click listener to each button
        button.addEventListener("click", function () {

            //retrieve part data in button 
            const partName = button.getAttribute('data-name');
            const partQuantity = button.getAttribute('data-quantity');
            const partImage = button.getAttribute('data-image');
            const partOrderDate = button.getAttribute('data-ordered-date');
            const partStore = button.getAttribute('data-selected-store'); 
            const status = "cancelled"; //change status to cancelled 

            //format date of cancellation
            let day = date.getDate(); 
            let month = date.getMonth() + 1; 
            let year = date.getFullYear(); 
            const receivedDate = `${day}-${month}-${year}`;

            const itemRow = button.closest(".item-row"); // Get the specific row containing the button
            const confirmDelete = confirm(`Are you sure you want to cancel order for (${partQuantity}x) ${partName}`); // Confirmation window
            if (confirmDelete) {
                itemRow.remove(); // Remove row
                alert(`Order for ${partName} cancelled.`);
                //WRITE TO DATABASE!!!!!!!! (WITH DATE)
            }

            let arrivedPart = {};
            arrivedPart.name = partName;
            arrivedPart.quantity = partQuantity;
            arrivedPart.imgSrc = partImage;
            arrivedPart.orderedDate = partOrderDate;
            arrivedPart.receivedDate = receivedDate;
            arrivedPart.selectedStore = partStore; 
            arrivedPart.status = status;

            console.log(arrivedPart);

            addToOrderHistory(arrivedPart);
            removeFromIncomingOrders(arrivedPart);

        });
    });
}

function loadReceivingPage(incomingOrder) {
    const container = document.querySelector('.item-row-container'); // Assign container to item-row-container
    container.innerHTML = ""; // Clear existing content

    incomingOrder.forEach(order => { //repeats for each order
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

function addToOrderHistory(arrivedPart) {
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

    }
    catch { // in case of file reading error
        window.alert("Error: Changes not saved");

    }

}

function removeFromIncomingOrders(arrivedPart) {
    let compObj = {};
    compObj.name = arrivedPart.name;
    compObj.quantity = arrivedPart.quantity;
    compObj.imgSrc = arrivedPart.imgSrc;
    compObj.orderedDate = arrivedPart.orderedDate;


    try {
        // fetch info from the server (backendServer.js)
        fetch(`${serverLocation}/delete-incoming-order`, {
            // sends the data to the serverLocation
            method: 'POST',
            headers: { // i have no idea what this does but i was told to add it
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compObj),
        });

        console.log("Successfully removed item");

    }
    catch { // in case of file reading error
        window.alert("Error: Changes not saved");

    }
}

document.addEventListener("DOMContentLoaded", () => {

    getIncomingOrders().then(() => {
        loadReceivingPage(incomingOrders) // Load receiving page with incoming orders

    });
});


// for some reason, received orders works, but not cancelled orders