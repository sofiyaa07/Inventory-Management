# Inventory Management
An computer engineering inventory manager that displays stock of parts. Parts are organized by location and associated with ordering threshold, supplier's purchase links, and notes. Node.js is required to run the code.
## Table of Contents
- [Usage](#usage)
- [Important CSV and File Setup](#important-csv-and-file-setup)

## Usage
To run the project in VSCode, set up the server by typing "node backendServer.js" in the terminal, then launch "main-menu.html" in a live server  
We haven't figured out how to do server setup, but the code should work  
There are no special security features, in theory anyone can access the server if it's running  

## Important CSV and File Setup
- Text files (incomingOrders.txt and orderHistory.txt) should NOT be manually changed
- There is no import CSV feature; part information needs to be added directly into the code's folder or through tools built into the application
- Example format for the CSV is here: https://docs.google.com/spreadsheets/d/1ckMXOloboJZIwcYEKx5_3PeeJXEMpKf7E4uuoFA3v4I/edit?usp=sharing, or viewable in Part Database - Sheet2.csv  

Additional notes:
- CSV does not need to be updated after being imported, you are able to update it using the application
- Example CSV has all the required formatting
- Location formatting should be [Shelf #][Column][Row] (e.g. 1A1 for shelf 1, column 1, row 1)
  - Shelves are: Miscellaneous shelf (doesn't exist in person, recommended for any parts without fixed locations, shelf 0), blue shelves at front (left 1, right 2), grey shelves at front (left 3, middle 4, right 5), large storage at back (left 6, middle 7, right 8)
  - Rows are not fixed, they are only suggestions. If needed, it is possible to add more rows than the physical shelves have, but not columns
  - If a location is invalid, it WILL NOT show up in the location view, but WILL show up in the list view
- Store links should all be written in one line, and each link should be seperated by " | " (space, vertical line, space)
- The CSV MUST be named "Part Database - Sheet2", or if not, code from backendServer.js must be changed
