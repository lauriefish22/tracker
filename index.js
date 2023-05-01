const connection = require('./config/connection');
const inquirer = require('inquirer');
const express = require('express')
// const fs = require('fs')

const DB = connection;
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
                'Add an employee',
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
                UpdateEmployee();
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
                Connection.end()
            };
        });
};
function viewDepartments() {
    DB.query('SELECT * FROM department', function (err, result) {
        console.table(result)



        startQuestions();
    })

}
startQuestions();