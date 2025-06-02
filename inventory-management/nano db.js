const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./history.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE orders
  (
    name       VARCHAR(50),
    model VARCHAR(50),
    quantity   VARCHAR(50),
    order_date        VARCHAR(50),
    status              VARCHAR(10),
  )
`);
}

module.exports = connectToDatabase();