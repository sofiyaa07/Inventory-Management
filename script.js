// Import Part class and helper functions
import Part from './part.js';
import * as helpers from './helper-methods.js';

// Make shelf
let shelf1 = helpers.makeShelf(3,4);

// Read csv
const csvData = `name,model,location,stock,notes,storeLinks,imgSrc,threshold,PART_ID
Arduino Uno REV3,ARD_A000066,shelf1[0][0],50,note,https...,image-location.jpg,10,0
Arduino GIGA Display Shield,ARD_A000166,shelf1[0][1],40,note,https...,image-location.jpg,25,1
Portenta Vision Shield - Ethernet,ARD_A000166,shelf1[0][2],30,note,https...,image-location.jpg,5,2
Arduino MKR Mem Shield,ARD_A000266,shelf1[1][0],20,note,https...,image-location.jpg,10,3
NodeMCU ESP8266,ARD_A000266,shelf1[1][1],10,note,https...,image-location.jpg,5,4`

const objects = helpers.csvToObjects(csvData);

// Sort objects by name, alphabetical 
let partAlpha = helpers.sortAlphaAsc(objects);
console.log(partAlpha);
