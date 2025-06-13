/*
* Sort methods used in listScript.js
* Most are directly copied from helper-methods.js, but this file is safe to import into frontend code
* (other file has promises and stuff that only work in node.js)
*/

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

export function sortByName(arr, searchString) {
    /*
    Input: array of part objects and a search
    Return: array of part objects only including objects with search string in their name
    */
    searchString = searchString.toLowerCase();
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        const name = arr[i].name.toLowerCase();

        if (name.includes(searchString)) {
            newArr.push(arr[i]);
        }
    }
    
    return newArr;
}