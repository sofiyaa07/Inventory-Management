import Part from './part.js';

const part1 = new Part(
    "Arduino Mega 2560",
    "ARD_A000067",
    "shelf2[1][0]",
    10, //stock 
    "Important part", //notes
    ["https://store.arduino.cc/products/arduino-mega-2560-rev3",
        "https://www.amazon.com/Arduino-A000067-2560-REV3-ATmega2560/dp/B0046AMGW0",
        "https://www.sparkfun.com/products/11061"], //links    
      "arduinoMega.jpg", //picture
    3
);


function createLinkRow(linkUrl, linkName = "Store Link") {
    const row = document.createElement('div');
    row.classList.add('link-row');
  
    const link = document.createElement('a');
    link.href = linkUrl;
    link.target = "_blank";
    link.textContent = linkName;
  
    // Extract domain for cleaner display
    try {
      const domain = new URL(linkUrl).hostname.replace('www.', '');
      link.textContent = domain;
    } catch (e) {
      link.textContent = linkName;
    }
  
    const selectButton = document.createElement('button');
    selectButton.textContent = '✓';
    selectButton.classList.add('select');
    selectButton.title='Select link'; 
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete');
    selectButton.title='Delete link'; 

  
    row.appendChild(link);
    row.appendChild(selectButton);
    row.appendChild(deleteButton);
  
    return row;
  }
  
  function loadOrderMorePage(part) {
    const container = document.querySelector('.scrollable-links');
    
    container.innerHTML = ""; // Clear existing content
  
    // Create a row for each store link
    part.storeLinks.forEach(linkUrl => {
      const row = createLinkRow(linkUrl);
      container.appendChild(row);
    });
  
    // Add event listener for the submit button
    const submitButton = document.querySelector('.submit-link input[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('click', () => {
        const newLinkInput = document.getElementById('addLink');
        if (newLinkInput.value) {
          const newRow = createLinkRow(newLinkInput.value, "New Link");
          container.appendChild(newRow);
          newLinkInput.value = ""; // Clear the input
        }
      });
    }

    selectButton(); 
    deleteButton(); 

  }

  function selectButton () {
    const selectButtons = document.querySelectorAll(".select");

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
  }

  function deleteButton () {
    const deleteButtons = document.querySelectorAll(".delete");

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
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    loadOrderMorePage(part1);
  });