//ran npm install but there's no package.json - Do I add this? How?

const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//making the connection to the sql database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'linds',
    database: 'companyA', //update the database name
    port: 3306
  },
  console.log(`Connected to the database.`)
);


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const firstPrompt = [
  {
    type: "list",
    name: "start",
    message:
      "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
  }
]

const start = async () => {
  const answer = await inquirer.prompt(firstPrompt);

  if (answer.list === "View all departments") {
    allDepartments();

  } else if (answer.list === "View all roles") {
    allRoles();

  } else if (answer.list === "View all employees") {
    allEmployees();

  } else if (answer.list === "Add a department") {
    addDepartment();

  } else if (answer.list === "Add a role") {
    addRole();

  } else if (answer.list === "Add an employee") {
    addEmployee();

  } else if (answer.list === "Update an employee role") {
    // updateRole();
console.log(role);
  } else {
// need either an exit here or to rerun the function
  }
}


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

function allDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  });
}



// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function allRoles() {
  db.query('SELECT * FROM role', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  });
}


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function allEmployees() {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
async function addDepartment() {
  const department = await inquirer.prompt([
  {
    type: "input",
    name: "dept",
    message:
      "What department would you like to add",
  }
]);
  db.query(`INSERT INTO department (name) VALUES ("${department.dept}")`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`added department ${department.dept}`)
    }
  });
}


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database


const role = [
  {
    type: "list",
    name: "role",
    message:
      "What is this employee's role?",
    choices: ["Marketing Manager", "Marketing Coordinator", "Sales Rep", "Sales lead", "Lawyer", "Accountant", "Customer Service Rep"]
  },
  {
    type: "input",
    name: "salary",
    message:
      "What is the salary for this role?",
  },
  {
    type: "list",
    name: "department",
    message:
      "What department does this employee work in?",
    choices: ["Marketing", "Sales", "Legal", "Finance", "Customer Service"]
  }
]

async function addRole() {
  const newRole = await inquirer.prompt(role);
db.query(`INSERT INTO role (name, salary, department) VALUES ("${newRole.role}", "${newRole.salary}", "${newRole.department}")`), (err, results) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Added ${newRole.role} to database`)
  }}
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

const employee = [
  {
    type: "input",
    name: "firstName",
    message:
      "What is the employees first name?",
  },
  {
    type: "input",
    name: "lastName",
    message:
      "What is the employee's last name?",
  },
  {
    type: "list",
    name: "role",
    message:
      "What is this employee's role?",
    choices: ["Marketing Manager", "Marketing Coordinator", "Sales Rep", "Sales lead", "Lawyer", "Accountant", "Customer Service Rep"]
  },
  {
    type: "input",
    name: "manager",
    message:
      "Who is the employee's manager?",
  },
]

async function addEmployee() {
  const newEmployee = await inquirer.prompt(employee);
db.query(`INSERT INTO employee (firstName, lastName, role, manager) VALUES ("${newEmployee.firstName}", "${newEmployee.lastName}", "${newEmployee.role}", "${newEmployee.manager}")`), (err, results) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Added ${newEmployee.firstName} to database`)
  }}
}
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// updateRole()

// not sure how to do this one, AT ALL



app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});