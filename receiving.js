document.addEventListener("DOMContentLoaded", () => {

    //ADD LOGIC TO FORWARD TO ORDER HISTORY TAB 
    
    const itemRowContainer = document.querySelector('.item-row-container');
    if (itemRowContainer) { //add click listener to buttons 
        itemRowContainer.addEventListener('click', (e) => {
            const clicked = e.target; //assigns clicked element to clicked variable 

            // Handle "Received" button click
            if (clicked.classList.contains('received')) { //if clicked button is part of received class (receiving button)
                const row = clicked.closest(".item-row"); //set row variable specific row containing clicked button 
                const orderConfirmed = confirm("Confirm order received and move to history?"); //confirmation window 
                if (orderConfirmed) { //if user confirms, removes row from receiving 
                    //NEEDS TO FORWARD IT TO ORDER HISTORY 
                    row.remove();
                }
            }

            // Handle "Cancel" button click
            if (clicked.classList.contains('cancel')) { //if clicked button is part of cancel class (cancel button) 
                const row = clicked.closest(".item-row"); //set row variable to the row containing clicked button 
                const confirmDelete = confirm("Are you sure you want to cancel this order?"); //confirmation window 
                if (confirmDelete) { //if user confirms, removes row from receiving
                    //SHOULD THIS STILL FORWARD TO HISTORY AND LABEL AS CANCELLED?? 
                    //if so, these can be done outside the if statements
                    //but set a variable to "cancel" or "receiving" to display in the history 
                    row.remove(); 
                    alert("Order canceled.");
                }
            }
        });
    }
});