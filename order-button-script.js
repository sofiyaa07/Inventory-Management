document.addEventListener("DOMContentLoaded", () => {
    // ORDER-MORE FUNCTIONS
    const deleteButtons = document.querySelectorAll(".delete");
    const selectButtons = document.querySelectorAll(".select");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const confirmDelete = confirm("Are you sure you want to delete this link?");
            if (confirmDelete) {
                const linkRow = button.closest(".link-row");
                linkRow.remove();
                alert("Link deleted");
            }
        });
    });

    selectButtons.forEach(button => {
        button.addEventListener("click", function () {
            const quantity = prompt("How many would you like to order?");
            if (quantity && !isNaN(quantity) && Number(quantity) > 0) {
                alert(`You've ordered ${quantity} of this item! Forwarding to receiving tab...`);
                window.location.href = "receiving.html";
            } else if (quantity !== null) {
                alert("Please enter a valid number.");
            }
        });
    });

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