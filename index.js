const connection = require('./config/connection');
const inquirer = require('inquirer');
const express = require('express')
// const fs = require('fs')

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
                connection.end()
            };
        });
};
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, result) {
        console.table(result)
        startQuestions();
    })

}
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, result) {
        console.table(result)
        startQuestions();
    })
}
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, result) {
        console.table(result)
        startQuestions();
    })
}
function addDepartment() {

    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'Enter the name of the new department'
        }
    ]).then((answer) => {
        let sql = `INSERT INTO department(title) VALUES( ? )`;
        connection.query(sql, answer.newDept, (err, res) => {
            if (err) throw err;
            console.log(`${answer.newDept} entered`);
            startQuestions();
        });
    });
};
let deptArray = [];
function chooseDept() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            deptArray.push(res[i].title);
        }
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
    connection.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
}

function addRole() {

    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'What is the title of the new role?'
        },
        {
            name: 'roleDept',
            type: 'input',
            message: 'Which department does this role belong to?',
            choices: chooseDept()
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the Salary?'
        }

    ]).then((answers) => {
        let deptId = chooseDept().indexOf(answers.department) + 1
        connection.query('INSERT INTO role SET ?',
            {
                title: answers.newRole,
                salary: answers.salary,
                department_id: deptId,

            }, function (err) {
                if (err) throw err
                console.table(answers);
                startQuestions();
            }
        )

        function addEmployee() {
            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'Enter the first name'
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'Enter the last name'
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'Please enter the salary'
                },
                {
                    name: 'role',
                    type: 'input',
                    message: 'Which role would you like to assign to this employee?',
                    choices: chooseRole()
                },
                {
                    name: 'manager',
                    type: 'input',
                    message: 'Which manager would you like to assign this employee to?',
                    choices: chooseManager()
                },
                {
                    name: 'department',
                    type: 'input',
                    message: 'Which department would you like to assign this employee to?',
                    choices: chooseDept()
                }

            ]).then((answers) => {
                let roleId = chooseRole().indexOf(answers.role) + 1
                let manId = chooseManager().indexOf(answers.manager) + 1
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        manager_id: manId,
                        role_id: roleId
                    }, function (err) {
                        if (err) throw err
                        console.table(answers)
                        startQuestions()
                    })

            })

        }

// let sql = `INSERT INTO department(title) VALUES( ? )`;
//         connection.query(sql, answer.newDept, (err, res) => {
//             if (err) throw err;
//             console.log(`${answer.newDept} entered`);
//             startQuestions();