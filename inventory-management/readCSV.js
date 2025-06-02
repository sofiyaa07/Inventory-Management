const fs = require("fs"); 
const { parse } = require("csv-parse"); 

fs.createReadStream("order-history.csv") //accepts argument from file, creates readable stream
.pipe(parse({ delimiter: ',', from_line: 2})) //forwards data to another stream, transform into array 
.on("data", function(row) { 
    console.log(row); 
})
.on("end", function () {
  console.log("finished");
})
.on("error", function (error) {
  console.log(error.message);
});