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
          "View Employees by Department",
          "View Employees by Manager",
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
        case "View Employees by Department":
          allEmployeeDept();
          break;
        case "View Employees by Manager":
          employeeByManagerView();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
            removeEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Update Employee Manager":
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
        case "Add Department":
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
      console.table(res)
      /* for (var i = 0; i < res.length; i++) {
        /* console.table(["ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id]); */
     
    /*   }  */
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



function employeeByManagerView() {
inquirer
.prompt({
  name: "employeeManager",
  type: "list",
  message: "Which Manager's team would you like to view?",
  choices: ["Bill Waterson", "Raoul Duke", "Kwame Ture", "Henry Miller"]})
  .then(function(answer) {
    switch (answer.employeeManager) {
      case "Bill Waterson":
        employeeManager(3);
        break;
      case "Raoul Duke":
        employeeManager(5);
        break;
      case "Kwame Ture":
        employeeManager(8);
        break;
      case "Henry Miller": 
        employeeManager(11);
        break;
      default:
        runSearch();
    };
    function employeeManager(id){ 
      var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title "
      query += "FROM employee LEFT JOIN role on employee.role_id = role.id " 
      query += "WHERE employee.manager_id = " + id + " AND employee.id != employee.manager_id;"   
      connection.query(query, answer.employeeManager, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.table([
              "Employee ID: " +
              res[i].id +
              " || Employee Name : " +
              res[i].first_name + " " + res[i].last_name +
              " || Role : " +
              res[i].title]);
          }; 
          runSearch();
      });
    };
  });
};


function addEmployee(){
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the Employee's ID?",
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the Employee's First Name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the Employee's Last Name?",
        },
         {
          name: "role",
          type: "list",
          message: "What is the Employee's role?",
          choices: ["Administrator", "HR Manager", "Paralegal", "Agency Attorney", "Sales Representative", "Sales Manager", "Junior Developer", "Senior Software Engineer"]},
        ])
  .then(function(answer) {
          let result;
          if (answer.role = "Administrator") {
            result = 1;
          } else if (answer.department = "HR Manager"){
            result = 2;
          } else if (answer.department = "Paralegal"){
            result = 3; 
          } else if (answer.department = "Agency Attorney"){
            result = 4; 
          } else if (answer.department = "Sales Representative"){
            result = 5; 
          } else if (answer.department = "Sales Manager"){
            result = 6; 
          } else if (answer.department = "Junior Developer"){
            result = 7; 
          } else if (answer.department = "Senior Software Engineer"){
            result = 8; 
          } else {
            return false; 
          } 
        var query = "INSERT INTO employee (id, first_name, last_name, role_id)" 
        query += " VALUES (" + answer.id + ","+ "'" + answer.firstName + "'" + ", " + "'" + answer.lastName + "'" + "," + result + ");";  
        console.log(query);       
        connection.query(query, function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
          }; 
            console.table([
                "ID: " +
                answer.id +
                " Name : " +
                answer.firstName + " " + answer.lastName +
                " || Role : " +
                answer.role + 
              " was successfully added!"]);
            runSearch();
        });
    });
} 

function removeEmployee(){
    inquirer
    .prompt({
      name: "removeEmployee",
      type: "input",
      message: "What is the Employee ID of the Employee you would like to remove?"
    })
      .then(function(answer) {
          var query = "DELETE FROM employee WHERE id = ?" ; 
          connection.query(query, answer.removeEmployee, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              console.table([res[i].first_name + " " + res[i].first_name + " has been removed"]);
              }; 
              runSearch();
          });
        });
      };

function updateEmployeeRole(){
    inquirer
    .prompt([
      {
        name: "updateRole",
        type: "input",
        message: "What is the new role ID?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
      name: "employeeID",
      type: "input",
      message: "What is the Employee ID of the Employee whose Role you wish to update?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
    .then(function(answer) {
          var query = "UPDATE employee SET role_id = ? WHERE id = ?" ; 
          connection.query(query, [answer.updateRole, answer.employeeID], function(err, res) {
            console.log(query);
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
              } 
              console.table(["Employee: " + answer.employeeID + " has been updated!"])
              runSearch();
          });
        });
      };


function updateEmployeeManager() {
};


function viewRoles() {
  var query = "SELECT * FROM role LEFT JOIN department on department.id = role.department_id ORDER by department.id ASC;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.table(["Role ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id + "||  Department Name: " + res[i].name]);
    }
    runSearch();
    });
  };


function addRoles() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "Provide an ID for the new Role",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "title",
          type: "input",
          message: "What is the Role's Title?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the Role's Salary?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
         {
          name: "department",
          type: "list",
          message: "Which Department is this Role in?",
          choices: ["HR", "Legal", "Sales", "Engineering"],
         },
      ])
  .then(function(answer) {
          let result;
          if (answer.department = "HR") {
            result = 1;
          } else if (answer.department = "Legal"){
            result = 2;
          } else if (answer.department = "Sales"){
            result = 3; 
          } else if (answer.department = "Engineering"){
            result = 4; 
          } else {
            return false; 
          }
        var query = "INSERT INTO role (id, title, salary, department_id)" 
        query += " VALUES (" + answer.id + ","+ "'" + answer.title + "'" + ", " + answer.salary + "," + result +  ");";  
        console.log(query);       
        connection.query(query, function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
            }; 
            console.table([
              "Role ID: " +
              answer.id +
              "|| Title: " +
              answer.title + 
              "|| Salary: " +
              answer.salary + 
              " || Department : " +
              answer.department + 
            " was successfully added!"])
            runSearch();
          });
        });
      }

function removeRoles(){
}

 
function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    console.log(query)
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.table(["Department ID: " + res[i].id + " || Name: " + res[i].name]);
    }
    runSearch();
    });
  }

  function addDepartments() {
    inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Provide an ID for the new Department",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "name",
        type: "input",
        message: "What is the name of the new Department?",
      },
    ])
.then(function(answer) {
      var query = "INSERT INTO department (id, name)" 
      query += " VALUES (" + answer.id + "," + "'" + answer.name + "'" +  ");";  
      console.log(query);       
      connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          }; 
          console.table([
            "Department ID: " +
            answer.id +
            "|| Name: " +
            answer.name +  
          " was successfully added!"])
          runSearch();
        });
      });
    }
  
  function removeDepartments(){
  }
