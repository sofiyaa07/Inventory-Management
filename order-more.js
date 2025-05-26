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


function createLinkRow(linkUrl, linkName = "Store Link") { //creates row for link and buttons 
    const row = document.createElement('div'); //create div element 
    row.classList.add('link-row'); //add to link-row class 
  
    const link = document.createElement('a'); //create link element 
    link.href = linkUrl;  //set link address to linkUrl
    link.target = "_blank"; //open in new tab 
    link.textContent = linkName; //set text of link to linkName 
  
    // Extract domain for cleaner display
    try {
      const domain = new URL(linkUrl).hostname.replace('www.', ''); //remove www. from link 
      link.textContent = domain; //set text to domain 
    } catch (e) {
      link.textContent = linkName;
    }
  
    const selectButton = document.createElement('button'); //create select button 
    selectButton.textContent = '✓';
    selectButton.classList.add('select'); //add to select class 
    selectButton.title='Select link'; //set title 
  
    const deleteButton = document.createElement('button'); //create delete button 
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete'); //add to delete class 
    selectButton.title='Delete link'; //set title 

    //add link and buttons to row 
    row.appendChild(link);
    row.appendChild(selectButton);
    row.appendChild(deleteButton);
  
    return row; 
  }
  
  function loadOrderMorePage(part) {
    const container = document.querySelector('.scrollable-links'); //set container to scrollable-links section 
    container.innerHTML = ""; //clear existing content
  
    //create row for each store link of part 
    part.storeLinks.forEach(linkUrl => {
      const row = createLinkRow(linkUrl); //call createLinkRow function passing url 
      container.appendChild(row); //add row to container 
    });
   
    //call button functions 
    submitButton(); 
    selectButton(); 
    deleteButton(); 

  }


  //handles new link input after clicking submit button 
  function submitButton() {
    //add event listener for submit button
    const submitButton = document.querySelector('.submit-link input[type="submit"]');
    if (submitButton) { //if submit button used, 
        submitButton.addEventListener('click', () => { //add click listener 
            const newLinkInput = document.getElementById('addLink'); //assign newLinkInput to user input in the 'addLink' text field
            if (newLinkInput.value) { //if there is a value to newLinkInput, 
                try {


                    //add code to update array; 


                    const domain = new URL(newLinkInput.value).hostname.replace('www.', ''); //extract domain from url 
                    const newRow = createLinkRow(newLinkInput.value, domain); //pass domain as link name
                    const container = document.querySelector('.scrollable-links');
                    container.appendChild(newRow); //add new row to scrollable-links container
                    newLinkInput.value = ""; //clear input field

                     //add buttons
                    selectButton();
                    deleteButton(); 
                } catch (e) {
                    alert("Please enter a valid URL."); //alert for invalid input 
                }
            }
        });
    }
  }

  function selectButton () {
    const selectButtons = document.querySelectorAll(".select"); 

    selectButtons.forEach(button => {
        button.addEventListener("click", function () { //add click listener to select buttons 
            const quantity = prompt("How many would you like to order?"); //assign quantity to user input to prompt
            if (quantity && !isNaN(quantity) && Number(quantity) > 0) { //if user inputs valid number
                alert(`You've ordered ${quantity} of this item! Forwarding to receiving tab...`); //displays quantity

              //SHOULD LOG CURRENT DATE WHEN FORWARDING TO RECEIVING TAB 
              const date = new Date();  //get current date and time
                window.location.href = "receiving.html"; //opens receiving tab 
            } else if (quantity !== null) {
                alert("Please enter a valid number."); //else alerts invalid input 
            }
        });
    });
  }

  function deleteButton () {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () { //add click lisyener to delete buttons 
            const confirmDelete = confirm("Are you sure you want to delete this link?"); //confirmation screen 
            if (confirmDelete) { //if user clicks confirm, 
                const linkRow = button.closest(".link-row"); //sets linkRow to the specific row containing the button 
                linkRow.remove(); //removes row 
                alert("Link deleted");
            }
        });
    });
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    loadOrderMorePage(part1);
  });