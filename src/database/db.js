const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "somnathk34268",
  database: "slot",
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database is Connected");
  }
});

module.exports = db;
