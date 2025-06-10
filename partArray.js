// this is the file that most of the other js files access for info
// will use helper methods to get the array
import Part from "./part.js";

const serverLocation = 'http://localhost:3000';

export let parts = [
    
];

// needs to be called like, everywhere lol
export function getPartArray() {
    return fetch(`${serverLocation}/load`) // returns a promise (feedback)
        .then(response => response.json()) // parses data into object array (?)
        .then(data => {
            // data: the part array that was read
            const mapped = data.map(obj =>
                new Part( // maps data to become Part objects specifically
                    obj._name, obj._model, obj._location, obj._stock,
                    obj._notes, obj._storeLinks, obj._imgSrc, obj._threshold
                )
            );
            // sets parts to nothing, then adds
            parts.length = 0;
            parts.push(...mapped); // ... takes each item in array and uses the function on it
            // (kinda like a loop, but simplified)

            console.log("partArray updated", parts);
        })

        // error handling
        .catch(error => {
            console.error("Error fetching part array:", error);
        });

}