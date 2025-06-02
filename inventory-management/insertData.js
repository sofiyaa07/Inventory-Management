const fs = require("fs"); 
const { parse } = require("csv-parse"); 
const db = require("./db");

fs.createReadStream("order-history.csv") //accepts argument from file, creates readable stream
.pipe(parse({ delimiter: ',', from_line: 2})) //forwards data to another stream, transform into array 
.on("data", function(row) { 
  db.serialize(function () {
    db.run(
      'INSERT INTO history VALUES(?, ?, ?, ?, ?)', 
      [row[0], row[1], row[2], row[3], row[4]],
      function (error) {
        if (error) {
          return console.log(error.message); 
        }
        console.log(`Inserted a row with the id: ${this.lastID}`); 
      }
    ); 
  });
  console.log(row); 
})
.on("end", function () {
  console.log("finished");
})
.on("error", function (error) {
  console.log(error.message);
});