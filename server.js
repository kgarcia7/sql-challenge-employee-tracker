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

    if (answers.prompt === 'Add Role') {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      }, 
      {
        type: "input", 
        name: "deparment_id",
        message: "Which department does this role belong to?"
      }
      ])
    .then((answers)=> {
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?)", [answers.tile, answers.salary, answers.department_id], (err, results) => {
        if(err) {
          console.log(err);
          return;
        }
        console.log("Added role!")
        employee_tracker_db();
        })
      })
    }

    if (answers.prompt === 'Add Employee') {
      inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "input",
          name: "role_id", 
          message: "What is the role ID?",
        },
        {
          type: "input", 
          name: "manager_id", 
          message: "What is the manager ID?"
        }
        ])
      .then((answers)=> {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, results) => {
          if(err) {
            console.log(err);
            return;
          }
          console.log("Added role!")
          employee_tracker_db();
          })
        })
      }
}

employee_tracker_db();