const fs = require("fs"); 
const {stringify} = require("csv-stringify"); 
const db = require("./db"); 

const filename = "saved_from_db.csv"; 
const writableStream = fs.createWriteStream(filename); 

const columns = [
    "name",
    "model",
    "quantity",
    "order_date",
    "status",
  ];

  const stringifier = stringify({ header: true, columns: columns });
  db.each('SELECT * FROM history', (error, row) => {
    if (error) {
        return console.log(error.message); 
    }
    stringifier.write(row);
});
  stringifier.pipe(writableStream); 
  console.log("Finished writing data"); 