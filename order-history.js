function createOrderRow(orders) {
    const row = document.createElement('div'); 
    row.classList.add('item-row'); 

    const image = document.createElement('img'); 
    image.src = orders.imgSrc; 
    row.appendChild(image); 

    const itemDetails = document.createElement('div'); 
    itemDetails.classList.add('item-details'); 

    const name = document.createElement('label'); 
    name.classList.add('name'); 
    name.textContent = "(+" + orders.quantity + ") " + orders.name; 
    itemDetails.appendChild(name); 

    const orderedDate = document.createElement('label'); 
    orderedDate.textContent = "Ordered: " + orders.orderedDate; // Set ordered date text
    orderedDate.classList.add('ordered-date'); 
    itemDetails.appendChild(orderedDate); 

    const receivedDate = document.createElement('label'); 

    if (orders.status === "received") {
        receivedDate.textContent = "Received: "; 
    } else if (orders.status === "cancelled") {
        receivedDate.textContent = "Cancelled: "; 
    }
    
    receivedDate.textContent += orders.receivedDate; // Set received date text
    receivedDate.classList.add('received-date'); 
    itemDetails.appendChild(receivedDate); 

    row.appendChild(itemDetails); 
    return row; // Return the created row
}

function loadOrderHistory(orders) {
    const container = document.querySelector('.item-row-container'); // Get item-row-container
    container.innerHTML = ""; // Clear existing content

    orders.forEach(order => {
        const row = createOrderRow(order); // Create row for each order
        container.appendChild(row); // Add row to container
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const orders = [ // TEMP ARRAY
        { name: "Arduino Uno REV3", quantity: '5', imgSrc: "Arduino.jpg", receivedDate: "June 5 2025", orderedDate: "May 5 2025", status: "cancelled" },
        { name: "Brduino Uno REV3", quantity: '4', imgSrc: "Arduino.jpg", receivedDate: "June 4 2024", orderedDate: "May 4 2025", status: "received" },
        { name: "Crduino Uno REV3", quantity: '3', imgSrc: "Arduino.jpg", receivedDate: "June 3 2023", orderedDate: "May 3 2025", status: "received" },
        { name: "Drduino Uno REV3", quantity: '2', imgSrc: "Arduino.jpg", receivedDate: "June 2 2022", orderedDate: "May 2 2025", status: "received" },
        { name: "Erduino Uno REV3", quantity: '1', imgSrc: "Arduino.jpg", receivedDate: "June 1 2021", orderedDate: "May 1 2025", status: "cancelled" },
        { name: "Frduino Uno REV3", quantity: '50', imgSrc: "Arduino.jpg", receivedDate: "May 31 2020", orderedDate: "April 30 2025", status: "received" }
    ];

    loadOrderHistory(orders); // Load order history page with orders
});