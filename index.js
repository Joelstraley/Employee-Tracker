require('dotenv').config();
const CT = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

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
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View Roles",
          "Add Roles",
          "Remove Roles",
          "View Departments",
          "Add Department",
          "Remove Department",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          allEmployeeView();
          break;
        case "View All Employees by Department":
          allEmployeeDept();
          break;
        case "View Employees by Manager":
          employeeByManagerView();
          break;
        case "Add Employee":
          employeeByManagerSearch();
          break;
        case "Remove Employee":
            employeeByManagerSearch();
            break;
        case "Remove Employee":
            employeeByManagerSearch();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Update Employee Manager":
            updateEmployeeManager();
            break;
        case "View Roles":
            updateEmployeeManager();
            break;
        case "View Roles":
            viewRoles();
            break;
        case "Add Roles":
            addRoles();
            break;
        case "Remove Roles":
            removeRoles();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "Add Departments":
            addDepartments();
            break;
        case "Remove Departments":
              removeDepartments();
              break;
        case "exit":
          connection.end();
          break;
        }
      });
  }

function allEmployeeView() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.table(["ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id]);
      }
      runSearch();
      });
    };
  
function allEmployeeDept() {
  inquirer
  .prompt({
    name: "employeeDept",
    type: "list",
    message: "In which Department would you like to view Employees?",
    choices: ["HR", "Legal", "Sales", "Engineering"]})
    .then(function(answer) {
      switch (answer.employeeDept) {
        case "HR":
          employeeDept();
          break;
        case "Legal":
          employeeDept();
          break;
        case "Sales":
          employeeDept();
          break;
        case "Engineering": 
          employeeDept();
          break;
        default:
          runSearch();
      };
      function employeeDept(){ 
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name "
        query += "FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id " 
        query +="WHERE department.name = ?" ; 
        connection.query(query, answer.employeeDept, function(err, res) {
          if (err) throw err;
          console.log(answer.employeeDept);
          for (var i = 0; i < res.length; i++) {
            console.table([
                "Employee ID: " +
                res[i].id +
                " || Employee Name : " +
                res[i].first_name + " " + res[i].last_name +
                " || Role : " +
                res[i].title +
                " || Department Name: " +
                res[i].name]);
            }; 
            runSearch();
        });
      };
    });
  };



  