const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
require("console.table");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  (err) => {
    if (err) {
      console.error("Error connecting to the database: " + err.stack);
      return;
    }
    console.log("Connected to the employee_tracker_db database.");
  }
);

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    employee_tracker_db();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    employee_tracker_db();
  });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    employee_tracker_db();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the new department?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answers.name],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Added department!");
          employee_tracker_db();
        }
      );
    });
}

function addRole() {
  db.query("SELECT * FROM department", (err, departments) => {
    if (err) {
      console.log(err);
      return;
    }
    const departmentChoices = departments.map((department) => ({
      name: `${department.name}`,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
          [answers.title, answers.salary, answers.department_id],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Added role!");
            employee_tracker_db();
          }
        );
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager ID?",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answers.first_name,
          answers.last_name,
          answers.role_id,
          answers.manager_id,
        ],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Added employee!");
          employee_tracker_db();
        }
      );
    });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, employees) => {
    if (err) {
      console.log(err);
      employee_tracker_db();
      return;
    }
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices,
        },
      ])
      .then((employeeAnswer) => {
        inquirer
          .prompt([
            {
              type: "input",
              name: "newRoleId",
              message: "Enter the new role ID for the selected employee:",
            },
          ])
          .then((roleAnswer) => {
            db.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [roleAnswer.newRoleId, employeeAnswer.employeeId],
              (updateErr, updateResults) => {
                if (updateErr) {
                  console.log(updateErr);
                } else {
                  console.log("Employee role updated!");
                }
                employee_tracker_db();
              }
            );
          });
      });
  });
}

let employee_tracker_db = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.prompt) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};

employee_tracker_db();
