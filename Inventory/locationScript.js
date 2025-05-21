/* things to add:
    - each of the columns and rows need to have different sizes
        - likely common multiples.
        - e.g. 120 columns, when a four column shelf has a unit added, adds 30
        - the column checker would then have to go currentCol/30
        - this is a nightmare to code lol

*/

// need a part array to work (placehodler under)
const parts = [
    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-0[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[3][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-0[0][7]", stock: "4" },

    
    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-1[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[0][1]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-1[1][7]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-2[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[0][1]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-2[1][7]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-3[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[0][1]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-3[1][7]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-4[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[0][1]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-4[1][7]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-5[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[0][1]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[1][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[2][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[3][1]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[0][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[1][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[2][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[3][2]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[0][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[1][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[2][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[3][3]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[0][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[3][4]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[2][5]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-5[1][7]", stock: "4" },

    { name: "Arduino Uno REV3,ARD_A000066", shortName: "Arduino Uno", location: "shelf-6[0][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[1][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[2][0]", stock: "4" },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[3][0]", stock: "4", threshold: 5 },
    { name: "Arduino Uno REV3,ARD_A000066", location: "shelf-6[0][1]", stock: "4", threshold: 5 },
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
    { name: "Arduino Uno REV3,ARD_A000077", location: "shelf-7[6][1]", stock: "4" },
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
            if (i == 0) { // 0 shelf (aka. locationless)
                stockEmptyShelf(allShelves[i]);
            }
            else if (i == 1 || i == 2 || i == 7) { // inelegant but works, 1, 2, 7
                stockShelves(allShelves[i], 8);
            }
            else if (i == 3 || i == 4 || i == 5) { // 3, 4, 5 (grey)
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
        const currShelf = getShelf(parts[i]);

        if (!allShelves[currShelf]) {
            allShelves[currShelf] = [];
        }

        allShelves[currShelf].push(parts[i]);
    }

}



// this needs a SORTED array, going in the order of shelf>column>row
function stockShelves(shelf, numCol) {
    // 1. clears the previous shelf
    const shelfId = `shelf-${getShelf(shelf[1])}`;

    if (document.getElementById(shelfId)) { // checks if the shelf exists before clearing
        document.getElementById(shelfId).innerHTML = "";

    }
    else {
        return 0;
    }


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
            // 2.5. for each part, if low on stock, adds the low-stock id
            if (shelf[i].stock < shelf[i].threshold) {
                addNewUnit(shelf[i], true);

            }
            else {
                addNewUnit(shelf[i], false);

            }

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

}


// adds a new unit for the shelf (DIFFERENT SIZED SHELVES NOT ACCOUNTED FOR)
function addNewUnit(part, isLowStock) {
    // (copied from listScript)
    // creates a link, and an img. adds img to the link, the adds link to the list
    const a = document.createElement("a");
    a.href = "../item-details.html";
    const p = document.createElement("p");
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = "../Arduino.jpg" // replace with parts[i].img, or whatever it's called

    // uses a short name, if there is one (not enough space for long name) <- bugged
    const text = document.createTextNode(part.shortName);
    const altText = document.createTextNode(part.name);

    // adds everything to each other
    if (part.shortName == undefined) {
        p.appendChild(altText); // default name (will be ugly)
    }
    else {
        p.appendChild(text); // short name (under like 10 characters/line)
    }

    div.appendChild(img) // adds img to <div>
    a.appendChild(div); // adds div to <a>
    a.appendChild(p); // adds text to <a>
    const shelfId = `shelf-${getShelf(part)}`;
    document.getElementById(shelfId).appendChild(a);

    if (isLowStock) {
        a.id = "low-stock";
    }
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
    return parseInt(part.location.substring(open + 1, close));
}

// returns third section of location string
function getRow(part) {
    // basically makes constants for each index, then returns the single digit
    const firstClose = part.location.indexOf(']');
    const secondOpen = part.location.indexOf('[', firstClose);
    const secondClose = part.location.indexOf(']', secondOpen);
    return parseInt(part.location.substring(secondOpen + 1, secondClose));
}



// on start run these methods:
fillShelves();