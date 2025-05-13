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

} catch (err) {
    console.error('Error reading file: ', err);
}

// Write to CSV file (obj -> str -> CSV)
let part0 = new Part("Arduino Nano 33 BLE Rev2 with headers", "ABX00072", shelf1[1][2], 35, "note", "https...", "image-location.jpg", 25);
helpers.addObjectInfoToCSV(part0, './Part Database - Sheet1.csv');