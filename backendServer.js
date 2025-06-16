/*
* Server that needs to be set up seperately from front-end, and before html is loaded
* Relies on node.js file reading and writing, and promises
* In VSCode, type "node backendServer.js" into terminal to run it
* Most files rely on this to get info about parts
* There are only around 3 or 4 unique functions, many are just reskinned with different file paths and request formats
* Nothing special needs to be downloaded, other than node.js
*/



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

import Part from "./part.js";



// whenever data is sent to the backend to be saved
app.post("/save", (request, response) => {
    const data = request.body; // stores the data that's sent

    // formats the data to be written in the file
    const formattedData = "\n" + addObjectInfoToCSV(data);

    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.appendFile("Part Database - Sheet2.csv", formattedData, (err) => { // testing
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
    // utf8: encoding of the data (how it encodes, no idea)S
    fs.readFile("Part Database - Sheet2.csv", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        const csvObject = csvToObjects(fileData); // from helper-methods
        response.json(csvObject); // responds with an object
    });
});




// item-details-------------------------------------------------------------------------

// edit part info by turning csv into an array, editing the array, then writing the array into csv
app.post('/update', (request, response) => {
    const updatedPart = request.body;
    console.log(updatedPart);

    fs.readFile("Part Database - Sheet2.csv", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        let csvObject = csvToObjects(fileData); // from helper-methods

        // csvObject: the entire csv as objects, finds the index of the part to be updated
        // callback function searches all the objects' names, and compares to updatedPart
        // Use originalName to find the correct part, fallback to storeLinks if needed
        let partToChange = csvObject.findIndex(part => part.name === updatedPart.originalName);

        if (partToChange === -1) {
            // fallback: try matching by storeLinks
            partToChange = csvObject.findIndex(part => part.storeLinks === updatedPart.storeLinks);
            console.log("CHANGING NAME");
        } else {
            console.log("NOT CHANGING NAME");
        }


        // formats links
        let formattedLinks = "";
        // join turns the array into a string, and speerates with the |
        formattedLinks += updatedPart.storeLinks.join(" | ");


        // changes the part at the index
        csvObject[partToChange] = new Part( // it looks kinda bad, but it's just setting it equal
            updatedPart.name, // only changes when name is being changed specifically
            updatedPart.model,
            updatedPart.location,
            Number(updatedPart.stock),
            updatedPart.notes,
            formattedLinks,
            updatedPart.imgSrc,
            Number(updatedPart.threshold)
        );

        console.log(updatedPart.name);


        console.log(csvObject[partToChange]);

        let formattedData = "name,model,location,stock,notes,storeLinks,imgSrc,threshold";

        // reformats data
        for (let i = 0; i < csvObject.length; i++) {
            formattedData += "\n" + addObjectInfoToCSV(csvObject[i]);

        }

        fs.writeFile("Part Database - Sheet2.csv", formattedData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Failed to write data');
            }

            // reformats links to be sent back
            const links = csvObject[partToChange].storeLinks;
            // the other breakpoint is '[space]|[space]' -- not just '|'
            const breakpoint = ' | ';
            csvObject[partToChange].storeLinks = links.split(breakpoint);

            response.json(csvObject[partToChange]);
        });

    });

});


// order history stuff--------------------------------------------------------------------

// takes info from the file, then rewrites it
app.post("/ordered", (request, response) => { // < this doesn't work
    const data = request.body; // stores the data that's sent


    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.readFile("orderHistory.txt", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        let tempArr = []; // turns orderHistory into an arary
        tempArr = JSON.parse(fileData);

        tempArr.push(data); // adds the new object into the array

        // adds the new array into orderHistory
        fs.writeFile("orderHistory.txt", JSON.stringify(tempArr, null, 4), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Failed to write data');
            }
            response.send("Order history updated");
        });

    });
});


// deletes everything in orderHistory.txt (entire text file turns into [])
app.post("/clear-order-history", (request, response) => { // < this doesn't work

    fs.writeFile("orderHistory.txt", "[]", (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return response.status(500).send('Failed to write data');
        }
        response.send("Order history cleared");
    });

});


// whenever data needs to be read from orderHistory.txt << this works
app.get('/order-history', (request, response) => {
    // utf8: encoding of the data (how it encodes, no idea)
    fs.readFile("orderHistory.txt", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        if (fileData != "") { // failsafe
            const historyObj = JSON.parse(fileData);
            response.json(historyObj); // responds with an object
        }

    });
});




// receiving and order-more----------------------------------------------------------

// whenever data needs to be read from incomingOrders.txt << this works
app.get('/incoming-orders', (request, response) => {
    // utf8: encoding of the data (how it encodes, no idea)
    fs.readFile("incomingOrders.txt", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        if (fileData != "") { // failsafe
            const incObj = JSON.parse(fileData);
            response.json(incObj); // responds with an object
        }

    });
});


// same thing but with different file path
app.post("/add-incoming-order", (request, response) => { // < this doesn't work
    const data = request.body; // stores the data that's sent

    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.readFile("incomingOrders.txt", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        let tempArr = []; // turns orderHistory into an arary
        tempArr = JSON.parse(fileData);

        tempArr.push(data); // adds the new object into the array

        // adds the new array into incomingOrders
        fs.writeFile("incomingOrders.txt", JSON.stringify(tempArr, null, 4), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Failed to write data');
            }
            response.send("Receiving updated");
        });

    });
});


app.post("/delete-incoming-order", (request, response) => { // < this doesn't work
    const data = request.body; // stores the data that's sent

    // parameters: file path, the thing to be written, and a callback function
    // callback -> calls this function when file runs, in this case, checks for error
    fs.readFile("incomingOrders.txt", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        let tempArr = []; // turns orderHistory into an arary
        tempArr = JSON.parse(fileData);

        // decipher this later

        // gets rid of the item in the tempArr with the same properties as data
        const index = tempArr.findIndex(item =>
            item.name === data.name &&
            item.quantity === data.quantity &&
            item.imgSrc === data.imgSrc &&
            item.orderedDate === data.orderedDate
        );
        if (index !== -1) {
            tempArr.splice(index, 1);
        } else {
            return response.status(404).send('Order not found');
        }

        // adds the new array into orderHistory
        fs.writeFile("incomingOrders.txt", JSON.stringify(tempArr, null, 4), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Failed to write data');
            }
            response.send("Receiving updated");
        });

    });
});

// updates csv but specifically only links (still takes the entire object as a parameter)
// responds with the object too, so page can update immediately
app.post('/update-links', (request, response) => {
    const updatedPart = request.body;

    fs.readFile("Part Database - Sheet2.csv", 'utf8', (err, fileData) => {
        if (err) { // error check
            console.error('Error reading file:', err);
            return response.status(500).send('Failed to read data');
        }

        let csvObject = csvToObjects(fileData); // from helper-methods

        // csvObject: the entire csv as objects, finds the index of the part to be updated
        // callback function searches all the objects' names, and compares to updatedPart
        const partToChange = csvObject.findIndex(part => part.name == updatedPart.name);

        let formattedLinks = "";
        // join turns the array into a string, and speerates with the |
        formattedLinks += updatedPart.storeLinks.join(" | ");


        // changes the part at the index
        csvObject[partToChange] = new Part( // it looks kinda bad, but it's just setting it equal
            // this is really messy, but everything is the same except for storeLinks
            csvObject[partToChange].name,
            csvObject[partToChange].model,
            csvObject[partToChange].location,
            Number(csvObject[partToChange].stock),
            csvObject[partToChange].notes,

            formattedLinks,

            csvObject[partToChange].imgSrc,
            Number(csvObject[partToChange].threshold)
        );



        let formattedData = "name,model,location,stock,notes,storeLinks,imgSrc,threshold";

        // reformats data
        for (let i = 0; i < csvObject.length; i++) {
            formattedData += "\n" + addObjectInfoToCSV(csvObject[i]);

        }

        fs.writeFile("Part Database - Sheet2.csv", formattedData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return response.status(500).send('Failed to write data');
            }
            // makes sure response is properly formmatted as an object

            const links = csvObject[partToChange].storeLinks;
            // the other breakpoint is '[space]|[space]' -- not just '|'
            const breakpoint = ' | ';
            csvObject[partToChange].storeLinks = links.split(breakpoint);

            console.log(csvObject[partToChange]);

            response.json(csvObject[partToChange]);
        });

    });

});




// logs the port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});