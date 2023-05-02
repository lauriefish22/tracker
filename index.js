const connection = require('./config/connection');
const inquirer = require('inquirer');
const express = require('express');
const { viewRoles, viewEmployees, viewDepartments } = require('./lib/view');
const { addRole, addEmployee, addDepartment } = require('./lib/add');
const { deleteEmployee, deleteRole, deleteDepartment } = require('./lib/delete');
const { updateEmployee, updateDepartment, updateRole } = require('./lib/update');
const db = connection;


// const PORT = process.env.PORT || 3006;

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// init();

const init = () => {
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
                'I am finished'],
        },])

        .then(answers => {
            const { choices } = answers;

            if (choices === 'View department') {
                viewDepartments();
            } else if
                (choices === 'View employees') {
                viewEmployees();
            }
            else if (choices === 'View roles') {
                viewRoles();
            }
            else if (choices === 'Add a department') {
                addDepartment();
            }
            else if (choices === 'Add an employee') {
                addEmployee();
            }
            else if (choices === 'Add a role') {
                addRole();
            }
            else if (choices === 'Update a department') {
                updateDepartment();
            }
            else if (choices === 'Update an employee') {
                updateEmployee();
            }
            else if (choices === 'Update a role') {
                updateRole();
            }
            else if (choices === 'Delete a department') {
                deleteDepartment();
            }
            else if (choices === 'Delete an employee') {
                deleteEmployee();
            }
            else if (choices === 'Delete e a role') {
                deleteRole();
            }
            else if (choices === 'See department budget') {
                seeBudget();
            }
            else if (choices === 'I am finished') {
                connection.end();
            };
        });
};


let deptArray = [];
function chooseDept() {
    db.query('SELECT * FROM roles', function (err, res) {
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
    db.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}
let managerArray = [];
function chooseManager() {
    db.query('SELECT first_name, last_name FROM employees WHERE manager_id IS NULL', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
}
init();




