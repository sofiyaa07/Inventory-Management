// Import Part class and helper functions
import { readFile } from 'fs/promises';
import * as helpers from './helper-methods.js';

// Make shelf
let shelf1 = helpers.makeShelf(3,4);

// Read in CSV file
const csvPath = './Part Database - Sheet1.csv';

try {
    const csvString = await readFile(csvPath, 'utf8');
    console.log('CSV read.');

    // Separate CSV string into key value pairs 
    const parts = helpers.csvToObjects(csvString);

    console.log(parts);
    // Sort objects by name, alphabetical 
    // let partAlpha = helpers.sortAlphaAsc(objects);
    // console.log(partAlpha);

} catch (err) {
    console.error('Error reading file: ', err);
}