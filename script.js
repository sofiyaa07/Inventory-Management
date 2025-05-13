// Import Part class and helper functions
import { readFile } from 'fs/promises';
import * as helpers from './helper-methods.js';
import Part from './part.js';

// Make shelf
let shelf1 = helpers.makeShelf(3,4);

// Read in CSV file (CSV -> str -> obj)
const csvPath = './Part Database - Sheet1.csv';
try {
    const csvString = await readFile(csvPath, 'utf8');
    console.log('CSV read.');

    // Separate CSV string into key value pairs 
    const parts = helpers.csvToObjects(csvString);

    // Sort objects by name, alphabetical 
    // let partAlpha = helpers.sortAlphaAsc(parts);
    // console.log(partAlpha);

} catch (err) {
    console.error('Error reading file: ', err);
}

// Write to CSV file (obj -> str -> CSV)
let part0 = new Part("Arduino Nano 33 BLE Rev2 with headers", "ABX00072", shelf1[1][2], 35, "note", "https...", "image-location.jpg", 25);
// Get Object values only, no keys
part0 = Object.values(part0).map(value => value.toString());
// Convert from Object to String
let part0Str = JSON.stringify(part0);
// Get rid of quotes and square brackets before writing to CSV
part0Str = part0Str.replace(/["\[\]]/g, '');
helpers.writeToCSV('./Part Database - Sheet1.csv', part0Str);
