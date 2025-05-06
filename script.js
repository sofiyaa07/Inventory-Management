// Import Part class and helper functions
import Part from './part.js';
import * as helpers from './helper-methods.js';

// Make shelf
let shelf1 = helpers.makeShelf(3,4);

// Read csv
// const file = event.target.files[0]
// const fr = new FileReader();
// fr.readAsText("Inventory-Management/Part Database - Sheet1.csv");

// Make part objects
let part0 = new Part("Arduino Uno REV3", "ARD_A000066", shelf1[0][0], 50, "note", "https...", "image-location.jpg", 10, 0);
let part1 = new Part("Arduino GIGA Display Shield", "ARD_A000166", shelf1[0][1], 40, "note", "https...", "image-location.jpg", 25, 1);
let part2 = new Part("Portenta Vision Shield - Ethernet", "ARD_A000266", shelf1[0][2], 30, "note", "https...", "image-location.jpg", 5, 2);
let part3 = new Part("Arduino MKR Mem Shield", "ARD_A000266", shelf1[1][0], 20, "note", "https...", "image-location.jpg", 10, 3);
let part4 = new Part("NodeMCU ESP8266", "ARD_A000266", shelf1[1][1], 10, "note", "https...", "image-location.jpg", 5, 4);

// Sort objects by name, alphabetical 
let partArr = [part0, part1, part2, part3, part4];
