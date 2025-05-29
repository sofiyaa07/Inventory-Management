document.addEventListener("DOMContentLoaded", () => {
    
    //ADD LOGIC TO FORWARD TO ORDER HISTORY TAB 
    let orderStatus = ""; 

    const itemRowContainer = document.querySelector('.item-row-container');
    if (itemRowContainer) { //add click listener to buttons 
        itemRowContainer.addEventListener('click', (e) => {
            const clicked = e.target; //assigns clicked element to clicked variable 
            const row = clicked.closest(".item-row"); //set row variable to the row containing clicked button 


            //handle "Received" button click
            if (clicked.classList.contains('received')) { //if clicked button is part of received class (receiving button)
                const orderConfirmed = confirm("Confirm order received and move to history?"); //confirmation window 
                if (orderConfirmed) { //if user confirms, removes row from receiving 
                    const date = new Date();  //get current date and time
                    orderStatus = "received"; 
                    row.remove();
                }
            }

            //handle "Cancel" button click
            if (clicked.classList.contains('cancel')) { //if clicked button is part of cancel class (cancel button) 
                const confirmDelete = confirm("Are you sure you want to cancel this order?"); //confirmation window 
                if (confirmDelete) { //if user confirms, removes row from receiving
                    orderStatus = "cancelled"
                    const date = new Date();  //get current date and time
                    row.remove(); 
                    alert("Order canceled.");
                }
            } //end of if

            const date  = new Date(); //get current date and time
            //FORWARD TO ORDER HISTORY PASSING ITEM, ORDERSTATUS (CANCELLED OR RECEIVED) AND DATE 
        });
    }
});