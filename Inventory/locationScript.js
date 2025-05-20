/* things to add:
    - assign a number of columns to each shelf
    - each of the columns and rows need to have different sizes
        - likely common multiples.
        - e.g. 120 columns, when a four column shelf has a unit added, adds 30
        - the column checker would then have to go currentCol/30
        - this is a nightmare to code lol
    - add low stock colour change
    - test for all locations pls!

*/

// need a part array to work (placehodler under)
const parts = [
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][7]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][10]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][13]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[0][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][7]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[3][10]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[1][13]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[0][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][7]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[3][10]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][13]", stock: "4" },


];


// array for arrays
const allShelves = [];


// this is the one that's called. calls all the other functions by looping
function fillShelves() {
    splitPartsByShelf();
    
    for (let i = 0; i < allShelves.length; i++) {
        if (allShelves[i] != null) {
            stockShelves(allShelves[i], 4); // <- this will need to be changed
        }
    }


}

// splits the giant array into more manageable ones, based on shelf
function splitPartsByShelf() {
    // splits parts into different arrays: one for each shelf
    for (let i = 0; i < parts.length; i++) {
        const correctedShelf = getShelf(parts[i])-1;

        if (!allShelves[correctedShelf]) {
            allShelves[correctedShelf] = [];
        }

        allShelves[correctedShelf].push(parts[i]);
    }


    // // add numCol to each of the shelves
    // allShelves[0].numColumns = 8;
    // allShelves[1].numColumns = 8;
    // allShelves[2].numColumns = 5;
    // allShelves[3].numColumns = 5;
    // allShelves[4].numColumns = 5;
    // allShelves[5].numColumns = 4;
    // allShelves[6].numColumns = 8;
    // allShelves[7].numColumns = 4; <-- this breaks the code for some reason 
    
}



// this needs a SORTED array, going in the order of shelf>column>row
function stockShelves(shelf, numCol) {
    // 1. clears the previous shelf
    const shelfId = `shelf-${getShelf(shelf[0])}`;
    document.getElementById(shelfId).innerHTML = "";

    // 2. takes the location of EACH PART -- if the location != the next location,
    // adds a blank space
    let currentCol = 0;
    let currentRow = 0;

    for (let i = 0; i < shelf.length; i++) { // for each part
        // loops around the columns AND rows. needs num columns (not rows)
        // e.g. 4 for the left shelf in the back (#6)
        // rows aren't needed because who cares if there's extras at the bottom
        let unitCol = getColumn(shelf[i]);
        let unitRow = getRow(shelf[i]);

        if (unitCol === currentCol && unitRow === currentRow) {
            addNewUnit(shelf[i]);
        }
        else {
            addBlankUnit(shelf[i]);
            i--; // goes backward in the loop until the incorrect unit is placed
        }
        
        // at the end, increments current column, then if it's too high, rests
        currentCol++;
        if (currentCol >= numCol) {
            currentCol = 0;
            currentRow++; // increments row since going left to right, up down
        }
    }

    // 3. for each part, if low on stock, adds the low-stock id
}


// adds a new unit for the shelf (DIFFERENT SIZED SHELVES NOT ACCOUNTED FOR)
function addNewUnit(part) {
    // creates an a element for each part PART
        const a = document.createElement("a");
        a.href = "../item-details.html";

        // adds img src=part.image and the div that surrounds it
        const div = document.createElement("div");
        const img = document.createElement("img");
        div.appendChild(img);
        a.appendChild(div);
        img.src = "../Arduino.jpg";

        // adds text to a p, and then to the a
        const p = document.createElement("p");
        const text = document.createTextNode(part.name);
        p.appendChild(text); // adds text to <p>

        // adds a to the specific shelf div
        const shelfId = `shelf-${getShelf(part)}`;
        document.getElementById(shelfId).appendChild(a);

}


function addBlankUnit(part) {
    // much simpler. creates a blank unit, adds the empty container id
        const a = document.createElement("a");
        a.href = "../add-new-item.html";
        a.id = "empty-container";

        // adds a to the specific shelf div
        const shelfId = `shelf-${getShelf(part)}`;
        document.getElementById(shelfId).appendChild(a);

}



// returns first section of location string
function getShelf(part) {
    const bracket = part.location.indexOf('[');
    return parseInt(part.location.substring(6, bracket));
}

// returns second section of location string
function getColumn(part) {
    const open = part.location.indexOf('[');
    const close = part.location.indexOf(']');
    return parseInt(part.location.substring(open+1, close));
}

// returns third section of location string
function getRow(part) {
    // basically makes constants for each index, then returns the single digit
    const firstClose = part.location.indexOf(']');
    const secondOpen = part.location.indexOf('[', firstClose);
    const secondClose = part.location.indexOf(']', secondOpen);
    return parseInt(part.location.substring(secondOpen+1, secondClose));
}



// on start run these methods:
fillShelves();