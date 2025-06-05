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
    name.textContent = "(+" + incomingOrder.quantity + ") " + incomingOrder.name; 
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

document.addEventListener("DOMContentLoaded", () => {
    const incomingOrder = [ // TEMP ARRAY
        { name: "Arduino Uno REV3", quantity: '5', imgSrc: "Arduino.jpg", orderedDate: "May 5 2025" },
        { name: "Brduino Uno REV3", quantity: '4', imgSrc: "Arduino.jpg", orderedDate: "May 4 2024" },
        { name: "Crduino Uno REV3", quantity: '3', imgSrc: "Arduino.jpg", orderedDate: "May 3 2023" },
        { name: "Drduino Uno REV3", quantity: '2', imgSrc: "Arduino.jpg", orderedDate: "May 2 2022" },
        { name: "Erduino Uno REV3", quantity: '1', imgSrc: "Arduino.jpg", orderedDate: "May 1 2021" },
        { name: "Frduino Uno REV3", quantity: '50', imgSrc: "Arduino.jpg", orderedDate: "April 30 2020" }
    ];

    loadReceivingPage(incomingOrder); // Load receiving page with incoming orders
});