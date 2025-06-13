let orders = [];

const serverLocation = 'http://localhost:3000';


function createOrderRow(orders) {
    const row = document.createElement('div'); //create a row to display part into 
    row.classList.add('item-row'); //add to item-row class 

    const image = document.createElement('img');
    image.src = orders.imgSrc;
    row.appendChild(image);

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    const name = document.createElement('label');
    name.classList.add('name');
    name.textContent = "(+" + orders.quantity + ") " + orders.name; //display name of part and quantity of order 
    itemDetails.appendChild(name); 

    const orderedDate = document.createElement('label');
    orderedDate.textContent = "Ordered: " + orders.orderedDate; // Set ordered date text
    orderedDate.classList.add('ordered-date');
    itemDetails.appendChild(orderedDate);

    const receivedDate = document.createElement('label'); 

    if (orders.status === "received") { //if part has been received, display this, otherwise display cancelled
        receivedDate.textContent = "Received: ";
    } else if (orders.status === "cancelled") {
        receivedDate.textContent = "Cancelled: ";
        receivedDate.style.color = "red"; //if cancelled, change text to red 
        orderedDate.style.color = "red";
        name.style.color = "red";
    }

    receivedDate.textContent += orders.receivedDate; // Set received date text
    receivedDate.classList.add('received-date');
    itemDetails.appendChild(receivedDate);

    row.appendChild(itemDetails); //append item details to row 
    return row; // Return the created row
}

function loadOrderHistory(orders) {
    const container = document.querySelector('.item-box'); // Get item-row-container
    container.innerHTML = ""; // Clear existing content

    orders.forEach(order => {
        const row = createOrderRow(order); // Create row for each order
        container.appendChild(row); // Add row to container
    });
}

function getOrderHistory() {
    return fetch(`${serverLocation}/order-history`) // returns a promise (feedback)
        .then(response => response.json()) // parses data into object array (?)
        .then(data => {
            // sets parts to nothing, then adds
            orders.length = 0;
            orders.push(...data); // ... takes each item in array and uses the function on it
            // (kinda like a loop, but simplified)

            console.log("order history updated", orders);
        })

        // error handling
        .catch(error => {
            console.error("Error fetching array:", error);
        });

}

document.addEventListener("DOMContentLoaded", () => {

    getOrderHistory().then(() => {
        console.log(orders);
        loadOrderHistory(orders); // Load order history page with orders

    });
});