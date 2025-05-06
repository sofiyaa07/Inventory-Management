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

export function sortAlphaAsc(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by name, A-Z
    */
    // Make comparator function for names, case insensitive
    let namesAZ = arr.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return namesAZ;
}

export function sortAlphaDesc(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by name, Z-A
    */
    // Make comparator function for names, case insensitive
    let namesZA = arr.sort((b, a) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
    return namesZA;
}

export function sortStockAsc(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by stock, low to high
    */
    // Make comparator function for stock, ascending
    let stockAsc = arr.sort((a, b) => {
        let stockA = a.stock;
        let stockB = b.stock;
        if (stockA < stockB) return -1;
        if (stockA > stockB) return 1;
        return 0;
    });
    return stockAsc;
}

export function sortStockDesc(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by stock, high to low
    */
    // Make comparator function for stock, ascending
    let stockAsc = arr.sort((b, a) => {
        let stockA = a.stock;
        let stockB = b.stock;
        if (stockA < stockB) return -1;
        if (stockA > stockB) return 1;
        return 0;
    });
    return stockAsc;
}

export function sortStockDiff(arr) {
    /*
    Input: array of part objects
    Return: sorted array of part objects by (stock - threshold), low to high
    */
    // Make comparator function for (stock - threshold), ascending
    let stockDiff = arr.sort((a, b) => {
        let diffA = (a.stock - a.threshold);
        let diffB = (b.stock - b.threshold);
        if (diffA < diffB) return -1;
        if (diffA > diffB) return 1;
        return 0;
    });
    return stockDiff;
}
