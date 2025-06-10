// import file writing and reading from helper-methods
// (do later)

import express from 'express'; // sets up express to make server stuff easier
import fs from 'fs'; // sets up node file stuff
import { csvToObjects, addObjectInfoToCSV } from './helper-methods.js';
// import path from 'path'; // sets up node paths (not using right now, but still useful)
const app = express(); // creates an express app to handle http requests (client side asks server for info)
export const PORT = 3000; // defines the port (aka, where the server is)fs

import cors from 'cors'; //prevents browsers from screaming at the code for being unsafe or something
app.use(cors());

// middleware (it's a middleman)
// parses strings sent over by front end back into objects
app.use(express.json());


// whenever data is sent to the backend to be saved
app.post("/save", (request, response) => {
    const data = request.body; // stores the data that's sent

    // formats the data to be written in the file
    const formattedData = "\n"+addObjectInfoToCSV(data);

    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.appendFile("Part Database - Sheet2.csv", formattedData, (err) => { // testing with a 2nd file for now
        if (err) {
            console.error('Error writing file:', err);
            return response.status(500).send('Failed to write data');
        }

        // if no error, sends the message that the data was saved
        response.send('Data saved successfully');
    });
});

app.post("/order", (request, response) => {
    const data = request.body; // stores the data that's sent

    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.appendFile("orderHistory.txt", data, (err) => { // testing with a 2nd file for now
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

        const csvObject = csvToObjects(fileData); // from helper-methods
        response.json(csvObject); // responds with an object
    });
});

// edit part info by deleting the row of edited part, then append new info
app.post('/update', (request, response) => {
    const name = request.partName;
    const updatedPart = request.body;

    // split csv string at every new line
    const lines = fs.readFileSync("Part Database - Sheet2.csv", 'utf8').split('\n');
    // look for part's row by name (column 1)
    const partLine = lines.filter(line => {
        const columns = line.split(',');
        return columns[0] !== name;
    });
    // add old name to updated part details
    const newLine = name + ',' + updatedPart.join(',');
    lines.push(newLine);

    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    res.send('Part updated successfully');
});


// logs the port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});