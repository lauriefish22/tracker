const connection = require('./config/connection');
const inquirer = require('inquirer');
const express = require('express')
const { viewRoles, viewEmployees, viewDepartments } = require('./lib/view');
const { addRole, addEmployee, addDepartment } = require('./lib/add');
const { deleteEmployee, deleteRole, deleteDepartment } = require('./lib/delete');
const { updateEmployee, updateDepartment, updateRole } = require('./lib/update');
const consoleTable = require('console.table');
const db = connection;
// const PORT = process.env.PORT || 3006;

const app = express();

//establishing connection to db

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connection.connect((error) => {
    if (error)
        throw error;
    console.log('connected');
    startQuestions();
})

const startQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View department',


                'View employees',
                'View employees by department',
                'View roles',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
                'Update an employee role',
                'Update an employee manager',
                'Delete a department',
                'Delete an employee',
                'Delete a role',
                'See department budgets',
                'I am finished']
        }])

        .then(answers => {
            const { choices } = answers;

            if (choices === 'View department') {
                viewDepartments();
            }
            if (choices === 'View employees') {
                viewEmployees();
            }
            if (choices === 'View roles') {
                viewRoles();
            }
            if (choices === 'Add a department') {
                addDepartment();
            }
            if (choices === 'Add an employee') {
                addEmployee();
            }
            if (choices === 'Add a role') {
                addRole();
            }
            if (choices === 'Update a department') {
                updateDepartment();
            }
            if (choices === 'Update an employee') {
                updateEmployee();
            }
            if (choices === 'Update a role') {
                updateRole();
            }
            if (choices === 'Delete a department') {
                deleteDepartment();
            }
            if (choices === 'Delete an employee') {
                deleteEmployee();
            }
            if (choices === 'Delete e a role') {
                deleteRole();
            }
            if (choices === 'See department budget') {
                seeBudget();
            }
            if (choices === 'I am finished') {
                connection.end()
            };
        });
};


let deptArray = [];
function chooseDept() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            deptArray.push(res[i].title);
        }
        console.log(deptArray);
    })
    return deptArray;
}
let roleArray = [];
function chooseRole() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}
let managerArray = [];
function chooseManager() {
    connection.query('SELECT first_name, last_name FROM employees WHERE manager_id IS NULL', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
}





