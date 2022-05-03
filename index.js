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
            'Add Employee', 
            'Update Employee Role', 
            'Quit'
        ]
    });
switch(answer.choices){
    case 'View All Roles':
         viewRole();
        break;
    case 'View All Employees':
        viewEmp();
        break;
    case 'View All Departments':
        viewDep();
        break;
    case 'Add Department':
        addDep();
        break;
    case 'Add Role':
        addRole();
        break;
    case 'Add Employee':
        addEmp();
        break;
    case 'Update Employee Role':
        updateEmp();
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
            console.error(err);
        };
        let showEmp = [];
        res.forEach(employees => showEmp.push(employees));
        console.table(showEmp);
        askQuestion();
    });
};

const viewDep = async() =>{

    let query = 'SELECT * FROM department';
    db.query(query, function(err, res){
        if(err){
            console.error(err);
        };
        let showDep = [];
        res.forEach(department => showDep.push(department));
        console.table(showDep);
        askQuestion();
    });
};

const viewRole = async() =>{
    let query = 'SELECT * FROM position';
    db.query(query, function(err, res){
        if(err){
            console.error(err);
        };
        let showRole = [];
        res.forEach(position => showRole.push(position));
        console.table(showRole);
        askQuestion();
    });
};

const addDep = async()=>{
    let dep = await inquirer.prompt([
        {
            name: 'depName',
            message: 'What is the name of the new department?'
        }
    ]);
    db.query('INSERT INTO department ?',{
        department_name: dep.newDep
    });
    console.log(`succesfully added ${dep.depName}`);
    askQuestion();
};

const addRole = async()=>{
    let role = await inquirer.prompt([
        {
            name: 'roleName',
            message: 'what is the name of the role?',
        },
        {
            name: 'salary',
            message: 'what is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does this role belong to?',
            choices: ['Sales', 'Engineering','Finance','Legal']
        }
    ]);    
    db.query('INSERT INTO position ?',{
        title: role.roleName,
        salary: role.salary
    });
        console.log(`succesfully added ${role.roleName}`);

    
    // let choosedept;
    // for(var i = 0; i < departments.length ; i++){
    //     if(departments[i].department_id === role.choice){
    //         chosedept = departments[i];
    //     };
    // };
    // let result = await db.query('INSERT INTO position SET ?',{
    //     title: role.roleName,
    //     salary: role.salary,
    //     department_id: role.department
    // })
    // console.log(`succesfully added ${role.roleName}`);
    askQuestion();
};

const addEmp = async() =>{
    let newEmp = await inquirer.prompt([
        {
            name: 'employeeName',
            message: 'What is the employee\'s name?'
        },
        {
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'empRole',
            message: 'what is the employee\'s role?',
            choices: ['Sales Lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead'
            ,'Lawyer']
        },
        {
            type: 'list',
            name: 'empMan',
            message: 'Who is the employee\'s manager?',
            choices: ['John Doe',
            'Mike Chan',
            'Ashley Rodriguez',
            'Kevin Tupic',
            'Kunal Singh',
            'Malia Brown']
        }    
    ])
    db.query('INSERT INTO employees SET ?',{
        first_name: newEmp.employeeName,
        last_name: newEmp.lastName,
    })
    console.log(`succesfully added ${newEmp.employeeName} ${newEmp.lastName}`)
    askQuestion();
}

const updateEmp = async() =>{
    let updateEmployee = await inquirer.prompt([
        {
            name: 'selectEmp',
            type: 'list',
            message:'Wich employee would you like to update?',
            choices:['John Doe',
            'Mike Chan',
            'Ashley Rodriguez',
            'Mike Chan',
            'Kevin Tupic',
            'Kunal Sing','Malia Brown','Sarah Lourd',
            'Tom Allen']
        },
        {
            name: 'selectRole',
            type: 'list',
            message: 'Wich role do you want to assign the selected employee?',
            choices: ['Sales Lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead'
            ,'Lawyer']
        }
    ]);
    db.query('UPDATE employee SET ? WHERE ?',[{role_id: updateEmployee.selectRole},{id: updateEmployee.selectEmp}]);
    console.log('succesfuly changed role');
    askQuestion();
};