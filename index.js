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

// when selected to add employee
// prompted for 
// employees first/last name 
// role
// manager

// when selected to update employee role 
// then prompted to select an employee to update their role updated to database

const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const { listenerCount } = require('mysql2/typings/mysql/lib/Connection');


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

db.connect(function(err){
    err? console.error(err) : askQuestion();
})

console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"

);


const askQuestion = async()=>{
    let answer = await inquirer.prompt({
        name: 'choices',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Roles', 
            'View All Employees', 
            'View All Departments', 
            'Add Department', 
            'Add Role', 
            'View Employee', 
            'Update Role', 
            'Quit'
        ]
    });
switch(answer.choices){
    case 'View All Roles':
                    
        break;
    case 'View All Employees':
        viewEmp();
        askQuestion();
        break;
    case 'View All Departments':

        break;
    case 'Add Department':

        break;
    case 'Add Role':
                
        break;
    case 'View Employee':

        break;
    case 'Update Role':

        break;
    case 'Quit':
        db.end();
        break;
    default:
        askQuestion();
    }
};

const viewEmp = async() =>{
    let query = 'SELECT * FROM employees';
    db.query(query, function(err, res){
        if(err){
            console.log(err)
        }
        let showEmp = [];
        res.forEach(employees => showEmp.push(employees));
        console.table(showEmp);
    })
}


