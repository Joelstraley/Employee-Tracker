require('dotenv').config();
const CT = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({

  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.PASSWORD,
  database: "employeeTrackerDB"
}); 

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  
 function afterConnection() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }
 
