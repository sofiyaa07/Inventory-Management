// this is chatgpt code
// working on commenting this, and changing the code to include the helper methods

// import file writing and reading from helper-methods
import { csvToObjects, readCSV, writeToCSV, addObjectInfoToCSV, removeItemFromCSV } from './helper-methods';

const express = require('express'); // sets up express to make server stuff easier
const fs = require('fs'); // sets up node file stuff
const path = require('path'); // sets up node paths
const app = express(); // creates an express app to handle http requests (client side asks server for info)
export const PORT = 3000; // defines the port (aka, where the server is)

// middleware (it's a middleman)
// parses strings sent over by front end back into objects
app.use(express.json());


// whenever data is sent to the backend to be saved
app.post("./Part Database - Sheet1.csv", (request, response) => {
    const data = request.body; // stores the data that's sent

    // formats the data to be written in the file
    const stringData = JSON.stringify(data);
    const formattedData = stringData.replace(/["\[\]{}]/g, '');


    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.writeFile("Part Database - Sheet2.csv", formattedData, (err) => { // testing with a 2nd file for now
        if (err) {
            console.error('Error writing file:', err);
            return response.status(500).send('Failed to write data');
        }

        // if no error, sends the message that the data was saved
        response.send('Data saved successfully');
    });
});


// whenever data needs to be read from the csv 
app.get('/load', (request, response) => {
    // utf8: encoding of the data (how it encodes, no idea)
    fs.readFile("Part Database - Sheet2.csv", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        // if no error, responds with the parsed file data (what was read)
        response.json(JSON.parse(fileData)); // responds with an object
    });
});

// logs the port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});