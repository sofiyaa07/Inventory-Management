export function makeShelf(numRows, numCols) {
    /*
    Input: numRows, numCols 
    Returns: an array of arrays with dimensions numRows by numCols
    */
    var shelf = [];
    for (var i = 0; i < numCols; i++) {
        shelf[i] = [];
        for (var j = 0; j < numRows; j++) {
            shelf[i][j] = [i,j];
        }
    }
    return shelf;
}

export function sortAlpha(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by name, alphabetical
    */
    // Make comparator function for names, case insensitive
    let namesAlpha = arr.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return namesAlpha;
}

export function sortStockAsc(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by stock, low to high
    */
    // Make comparator function for stock, ascending
    let stockAsc = arr.sort((a, b) => {
        let nameA = a.stock;
        let nameB = b.stock;
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return stockAsc;
}
