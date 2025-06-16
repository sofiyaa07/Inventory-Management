// this is the file that most of the other js files access for info
// will use helper methods to get the array
import Part from "./part.js";
import { sortByLocation } from "./Inventory/sortMethods.js";

const serverLocation = 'http://localhost:3000';

export let parts = [

];

// needs to be called like, everywhere lol
export function getPartArray() {
    return fetch(`${serverLocation}/load`) // returns a promise (feedback)
        .then(response => response.json()) // parses data into object array (?)
        .then(data => {
            // data: the part array that was read
            const mapped = data.map(obj => { // for each object in the data...

                // converts store links into an array (before creating new parts)
                const links = obj._storeLinks;
                // the other breakpoint is '[space]|[space]' -- not just '|'
                const breakpoint = ' | ';
                const linksArr = links.split(breakpoint);

                return new Part( // maps data to become Part objects specifically
                    obj._name,
                    obj._model,
                    obj._location,
                    obj._stock,
                    obj._notes,
                    linksArr,
                    obj._imgSrc,
                    obj._threshold
                )
            });


            // makes a temp array with the information
            let unsortedParts = [];
            unsortedParts.push(...mapped); // ... takes each item in array and uses the function on it
            // (kinda like a loop, but simplified)

            console.log("parts successfully fetched");

            // resets parts, then fills it with the new array, sorted
            parts.length = 0;
            parts = sortByLocation(unsortedParts);


            console.log("parts successfully sorted by location", parts);
        })

        // error handling
        .catch(error => {
            console.error("Error fetching part array:", error);
        });

}