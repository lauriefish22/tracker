// const connection = require('./config/connection');
// const inquirer = require('inquirer');
const express = require('express')
const fs = require('fs')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;

const app = express();

//establishing connection to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log('Connected to tracker_db')
);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'Where would you like to do?',
            choices: ['View departments',

                'View departments',
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

            if (choices === 'View departments') {
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
