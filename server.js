const inquirer = require('inquirer');
const mysql = require('mysql2');

//making the connection to the sql database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'linds',
    database: 'companyA', 
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
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
  }
]

const start = async () => {
  const answer = await inquirer.prompt(firstPrompt);

  if (answer.start === "View all departments") {
    allDepartments();

  } else if (answer.start === "View all roles") {
    allRoles();

  } else if (answer.start === "View all employees") {
    allEmployees();

  } else if (answer.start === "Add a department") {
    addDepartment();

  } else if (answer.start === "Add a role") {
    addRole();

  } else if (answer.start === "Add an employee") {
    addEmployee();

  } else if (answer.start === "Update an employee role") {
    updateRole();
// console.log(role);
  } else if  (answer.start === "Exit") {
    console.log("Peace out! 🤙");
    process.exit();
  }
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

function allDepartments() {
  db.query('SELECT id, name AS department_name FROM department', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results);
      start();
    }
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

function allRoles() {
  db.query('SELECT role.title, role.id AS role_id, department.name as department, role.salary FROM role JOIN department ON role.department_id = department.id', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results);
      start();
    }
  });
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

function allEmployees() {
  db.query('SELECT employee.id AS id, CONCAT(employee.first_name, " ", employee.last_name) AS employee_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.table(results);
      start();
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
      console.log(`added department ${department.dept}`);
      start();
    }
  });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

async function addRole() {
  db.query(`SELECT * FROM department`, async (err, departmentResults) => {
    if (err) {
      console.log(err)
    }
    let departmentArray = departmentResults.map(department => ({name: department.name, value: department.id}));
 
  const newRole = await inquirer.prompt([
      {
        type: "input",
        name: "role",
        message:
          "What is the name of the new role?",
       },
      {
        type: "number",
        name: "salary",
        message:
          "What is the salary for this role?",
      },
      {
        type: "list",
        name: "department",
        message:
          "What department does this role belong to?",
        choices: departmentArray
      }
    ]);
    
db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${newRole.role}", "${newRole.salary}", "${newRole.department}")`, (err, results) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Added ${newRole.role} to database`);
    start();
  }})
})
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

async function addEmployee() {
db.query(`SELECT * FROM role`, (err, results) => {
  if (err) {
    console.log(err)
  } 
  let roleArray = results.map(role => ({name: role.title, value: role.id}));
  db.query(`SELECT * FROM employee`, async (err, managerResults) => {
    if (err) {
      console.log(err)
    } 
    let managerArray = managerResults.map(manager => 
      ({name: manager.first_name, value: manager.id}));

    const newEmployee = await inquirer.prompt([
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
        choices: roleArray,
      },
      {
        type: "list",
        name: "manager",
        message:
          "Who is the employee's manager?",
        choices: managerArray,
      },
    ]);

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.firstName}", "${newEmployee.lastName}", "${newEmployee.role}", "${newEmployee.manager}")`, (err, results) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Added ${newEmployee.firstName} to database`);
        start();
      }})

  })
})
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
async function updateRole() {
  db.query(`SELECT * FROM role`, async (err, res) => {
    if (err) {
      console.log(err)
    } 
    let roleArray = res.map(role => ({name: role.title, value: role.id}));

  db.query(`SELECT * FROM employee`, async (err, res) => {
    if (err) {
      console.log(err)
    } 
    const employeeArray = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));

  const roleUpdate = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message:
        "Which employee's role would you like to update?",
      choices: employeeArray,
    },
    {
      type: "list",
      name: "role",
      message:
        "What is this employee's new role?",
      choices: roleArray,
    }
  ]);

  const employeeId = roleUpdate.id;
const newRole = roleUpdate.role;

  db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [newRole, employeeId], (err, results) => {
    if (err) {
      console.log(err);
}
start();   
})
})
})
}

start();


// BONUS ## Bonus

// Try to add some additional functionality to your application, such as the ability to do the following:

// * Update employee managers.

// * View employees by manager.

// * View employees by department.

// * Delete departments, roles, and employees.

// * View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.