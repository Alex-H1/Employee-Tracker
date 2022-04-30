// create inquirer prompts 
    // view all departments
    // view all employees 
    // add role 
    // add employee 
    // update employee role 
// when selected view all departments, 
// then shown a table with a table that is formatted with department names and ids
// when selected to choose all roles 
// then presented with job title, role id, and department that role belongs to and the salary for that role
// when selected to view all employees 
// then presented with a table showing employee data: employee id, salaries, and the managers that the employees report to
// when selected add department 
// then prompted to enter name of department and then department is added to database
// when selected to add a role 
// then prompted to add employee name, salary and department then added to database
// when selected to update employee role 
// then prompted to select an employee to update their role updated to database
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employee_db database.`)
);


function askQuestion(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'whatToDO',
            message: 'What would you like to do?',
            choices:['Add Employee','Update Employee Role','View All Roles','Add Roles','View All Departments','Add Department','Quit']
        }
    ])
    .then(choices=>{
        switch(choices){
            case 'Add Employee':

                break;
            case 'Update Employee Role':

                break;
            case 'View All Roles':

                break;
            case 'Add Roles':

                break;
            case 'View All Departments':
                
                break;
            case 'Add Department':

                break;
            default:
                askQuestion();
        }
    });
};

function init(){
    askQuestion();
}

init();