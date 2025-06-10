/* things to add:
    - need to change how the functions at the bottom reads the array (new format is 1A1, ex)
*/

// need a part array to work (placehodler under)
import { parts, getPartArray } from "../partArray.js";

// array for arrays
const allShelves = [];


// this is the one that's called. calls all the other functions by looping
function fillShelves() {
    console.log("shelves Filled")
    console.log(parts);

    splitPartsByShelf();

    for (let i = 0; i < allShelves.length; i++) {
        if (allShelves[i] != null) {
            if (i == 0) { // 0 shelf (aka. locationless)
                stockEmptyShelf(allShelves[i]);
            }
            else if (i == 1 || i == 2 || i == 7) { // inelegant but works
                stockShelves(allShelves[i], 8);
            }
            else if (i == 3 || i == 4 || i == 5) { // (grey)
                stockShelves(allShelves[i], 5);
            }
            else { // shelf 6 and 8 go here
                stockShelves(allShelves[i], 4);
            }
        }
    }

}

// special exception for empty shelf: does not check location
function stockEmptyShelf(shelf) {
    if (document.getElementById("shelf-0")) { // checks if the shelf exists before clearing
        document.getElementById("shelf-0").innerHTML = "";

    }
    else {
        return 0;
    }

    for (let i = 0; i < shelf.length; i++) {
        if (shelf[i].stock < shelf[i].threshold) {
            addNewUnit(shelf[i], true);

        }
        else {
            addNewUnit(shelf[i], false);

        }
    }
}



// splits the giant array into more manageable ones, based on shelf
function splitPartsByShelf() {
    // splits parts into different arrays: one for each shelf
    for (let i = 0; i < parts.length; i++) {
        // skip invalid parts
        if (!parts[i] || !parts[i].location) continue;
        else if (getShelf(parts[i]) < 0) continue;
        else if (getRow(parts[i]) <= 0) continue;


        const currShelf = getShelf(parts[i]);

        // sets up allShelves[i] if it's null
        if (!allShelves[currShelf]) {
            allShelves[currShelf] = [];
        }

        allShelves[currShelf].push(parts[i]);
    }

}



// this needs a SORTED array, going in the order of shelf>column>row
function stockShelves(shelf, numCol) {
    // 1. clears the previous shelf
    const shelfId = `shelf-${getShelf(shelf[0])}`;

    if (document.getElementById(shelfId)) { // checks if the shelf exists before clearing
        document.getElementById(shelfId).innerHTML = "";

    }
    else {
        return 0;
    }


    // 2. takes the location of EACH PART -- if the location != the next location,
    // adds a blank space
    let currentCol = 0;
    let currentRow = 1;
    let totalCells = 0;
    let amountOfIterations = 0;
    const maxIterations = 300; // failsafe for infinite loop

    for (let i = 0; i < shelf.length; i++) { // for each part
        // loops around the columns AND rows. needs num columns (not rows)
        // e.g. 4 for the left shelf in the back (#6)
        // rows aren't needed because who cares if there's extras at the bottom
        let unitCol = getColumn(shelf[i]);
        let unitRow = getRow(shelf[i]);

        // corrects for excess columns
        if (unitCol >= numCol) continue;

        if (unitCol === currentCol && unitRow === currentRow) {
            // 2.5. for each part, if low on stock, adds the low-stock id
            if (shelf[i].stock < shelf[i].threshold) {
                addNewUnit(shelf[i], true);

            }
            else {
                addNewUnit(shelf[i], false);

            }
            totalCells++;

        }
        else {
            // fromCharCode gets the associated string from the ascii code
            const placement = `${getShelf(shelf[i])}${String.fromCharCode(currentCol + 65)}${currentRow}`;
            addBlankUnit(placement);
            i--; // goes backward in the loop until the incorrect unit is placed
            totalCells++;

        }

        // at the end, increments current column, then if it's too high, rests
        currentCol++;
        if (currentCol >= numCol) {
            currentCol = 0;
            currentRow++; // increments row since going left to right, up down
        }

        amountOfIterations++;
        if (amountOfIterations > maxIterations) {
            console.log("LOOP IS STUPID AND BROKE");
            break;
        }

    }


    // // // fills the rest of the shelf with blank units
    // if (shelfId ==)
    // const numberOfCellsPerShelf = [64, 64, 68, 68, 68, 68, 68, 68]
    // console.log(totalCells);

    // if (amountOfIterations < numberOfCellsPerShelf[getShelf(shelf[0])]) {
    //     const numShelvesToBeFilled = numberOfCellsPerShelf[getShelf(shelf[0])] - totalCells;

    //     console.log("Filling "+numShelvesToBeFilled+" Shelves");

    //     for (let i = 0; i < numShelvesToBeFilled; i++) {
    //         const placement = `${getShelf(shelf[i])}${String.fromCharCode(currentCol + 65)}${currentRow}`;
    //         addBlankUnit(placement);

    //         currentCol++;
    //         if (currentCol >= numCol) {
    //             currentCol = 0;
    //             currentRow++; // increments row since going left to right, up down
    //         }
    //     }
    // }

    // ABVE DOESN"T WORK

}


// adds a new unit for the shelf (DIFFERENT SIZED SHELVES NOT ACCOUNTED FOR)
function addNewUnit(part, isLowStock) {
    // (copied from listScript)
    // creates a link, and an img. adds img to the link, the adds link to the list
    const a = document.createElement("a");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = part.imgSrc; // replace with parts[i].img, or whatever it's called

    // uses a short name, if there is one (not enough space for long name) <- bugged
    const text = document.createTextNode(part.name);
    p.appendChild(text); // short name (under like 10 characters/line)

    div.appendChild(img) // adds img to <div>
    a.appendChild(div); // adds div to <a>
    a.appendChild(p); // adds text to <a>
    const shelfId = `shelf-${getShelf(part)}`;
    document.getElementById(shelfId).appendChild(a);

    a.href = "#";
    // same as list scripts, but changed parameter
    a.addEventListener("click", () => { // sets local storage current part
        sessionStorage.setItem("currentPart", JSON.stringify(part));
        // stringify  sets the object to a string so it can be properly stored
        window.location.href = "../item-details.html"; // THEN redirects
    });

    if (isLowStock) {
        a.id = "low-stock";
    }
}


function addBlankUnit(placement) { // adds the NEXT valid location, not the current one (need to fix)
    // much simpler. creates a blank unit, adds the empty container id
    const a = document.createElement("a");
    a.id = "empty-container";

    // when passed into add-new-item, it should only take the location
    a.href = "#";
    // same as list scripts, no stringify necessary

    a.addEventListener("click", () => { // sets local storage current part
        sessionStorage.setItem("emptyLocation", placement);
        console.log(placement);
        window.location.href = "../add-new-item.html"; // THEN redirects
    });


    // adds a to the specific shelf div, uses strings instead of objects
    const shelfId = `shelf-${placement.charAt(0)}`;
    document.getElementById(shelfId).appendChild(a);





}



// returns first section of location string
function getShelf(part) {
    return parseInt(part.location.charAt(0));
}

// returns second section of location string
function getColumn(part) {
    console.log(parseInt(part.location.charAt(1).charCodeAt(0)) - 65);
    return parseInt(part.location.charAt(1).charCodeAt(0)) - 65;
}

// returns third section of location string
function getRow(part) {
    return parseInt(part.location.substring(2));
}



// on start run these methods:
document.addEventListener("DOMContentLoaded", () => {
    getPartArray().then(() => {
        fillShelves();

    });

});