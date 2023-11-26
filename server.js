const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config()
require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL Username
      user: process.env.DB_USER,
      // Your MySQL Password
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

let employee_tracker_db = function () {
  inquirer.prompt([
    {
      type: 'list',
      name: 'prompt',
      message: 'What would you like to do',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }
  ]).then((answers) => {
    if (answers.prompt === 'View All Employees') {
      db.query("SELECT * FROM employee", (err, results) => {
        if(err) {
          console.log(err);
        }
        console.table(results);
        employee_tracker_db();
      })
    }
    if (answers.prompt === 'View All Roles') {
      db.query("SELECT * FROM role", (err, results) => {
        if(err) {
          console.log(err);
        }
        console.table(results);
        employee_tracker_db();
      })
    }
    if (answers.prompt === 'View All Departments') {
      db.query("SELECT * FROM department", (err, results) => {
        if(err) {
          console.log(err);
        }
        console.table(results);
        employee_tracker_db();
      })
    }

    if (answers.prompt === 'Add Department') {

      inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the new department?"
        }
      ])
      .then((answers)=> {
        
              db.query("INSERT INTO department (name) VALUES (?)", [answers.name], (err, results) => {
                if(err) {
                  console.log(err);
                  return;
                }
                console.log("Added department!")
                employee_tracker_db();
              })

      })

    }
  })
}

employee_tracker_db();