import fs from 'fs/promises';
import Part from './part.js';


export function makeShelf(numRows, numCols) {
    /*
    Input: number of rows and number of columns 
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

export function csvToObjects(csvStr) {
    /*
    Input: String from CSV file, with desired keys in first row and corresponding values for each object in the rows after
    Return: list of part objects
    */
    // Each part object is separated by a new line, use trim to get rid of spaces
    const parts = csvStr.trim().split('\n');
    console.log(parts);
    // Each key in the header is separated by a comma
    const keys = parts[0].split(',').map(key => key.trim());
    // map() goes over each element in parts
    return parts.slice(1).map(part => {
        const values = part.split(',');
        const partData = keys.reduce((obj, header, index) => {
            // Match each object key to value 
            obj[header] = values[index];
            return obj;
        }, {});

        // Make part object, casting to number where needed
        return new Part(
            partData.name,
            partData.model,
            partData.location,
            Number(partData.stock),
            partData.notes,
            partData.storeLinks,
            partData.imgSrc,
            Number(partData.threshold),
        );
    });
}

export function readCSV(file) {
    /*
    Input: CSV file to read
    Return: contents of CSV file as a String
    */
    // Promise is a placeholder object for the CSV file contents
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = (event) => {
            resolve(event.target.result);
        }

        fr.onerror = (event) => {
            reject(event.target.error);
        }

        fr.readAsText(file);
    });
}

async function writeToCSV(filePath, str) {
    /*
    Input: path to CSV file and string to append
    */
    try {
        await fs.appendFile(filePath, `\n${str}`, 'utf-8');
        console.log(`${str} appended.`);
    } catch(err) {
        console.log('Error appending str: ', err);
    }
}

export function addObjectInfoToCSV(obj, filePath) {
    /*
    Input: Part Object and CSV filePath
    */
    let vals = Object.values(obj).map(value => value.toString());
    // Convert to String
    let valsStr = JSON.stringify(vals);
    // Get rid of quotes and square brackets before writing to CSV
    valsStr = valsStr.replace(/["\[\]]/g, '');
    writeToCSV(filePath, valsStr);
}

// did not test yet (+ it just isn't complete)
export function removeItemFromCSV(obj, filePath) {
    /*
    Input: Part object (singular) and CSV file path
    Turns the object into a string, then searches each line of the CSV
    for a matching string and removes it
    */

    let objAsString = JSON.stringify(obj);
    // regex to remove brackets and quotes (shouldn't remove slashes)
    objAsString = objAsString.replace(/["\[\]]/g, ''); // objAsString is how it's written in the CSV

    // file reading stuff here
}