// NEED TO ADD LOGIC FOR BUTTONS FOR NEW LINKS (AFTER U ADD A LINK)

document.addEventListener("DOMContentLoaded", () => {
    
    // RECEIVING BUTTON FUNCTIONS
    const itemRowContainer = document.querySelector('.item-row-container');
    if (itemRowContainer) {
        itemRowContainer.addEventListener('click', (e) => {
            const clicked = e.target;

            // Handle "Received" button click
            if (clicked.classList.contains('received')) {
                const row = clicked.closest(".item-row");
                const orderConfirmed = confirm("Confirm order received?");
                if (orderConfirmed) {
                    row.remove();
                    alert("Moving order to 'Past Orders'...");
                }
            }

            // Handle "Cancel" button click
            if (clicked.classList.contains('cancel')) {
                const row = clicked.closest(".item-row");
                const confirmDelete = confirm("Are you sure you want to cancel this order?");
                if (confirmDelete) {
                    row.remove();
                    alert("Order canceled.");
                }
            }
        });
    }
});