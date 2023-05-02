const connection = require('./config/connection');
const inquirer = require('inquirer');

// const { viewRoles, viewEmployees, viewDepartments } = require('./lib/view');
const { addRole, addEmployee, addDepartment } = require('./lib/add');
const { deleteEmployee, deleteRole, deleteDepartment } = require('./lib/delete');
// const { updateEmployee, updateDepartment, updateRole } = require('./lib/update');
const db = connection;


// const PORT = process.env.PORT || 3006;







function init() {
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
                'Update a role',
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
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, result) {
        console.table(result);
        init();
    })

}
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, result) {
        consoleTable(result);
        init();
    })
}
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, result) {
        console.table(result);
        init();
    })
}
function updateEmployee() {
    let employeeArray = [];
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            employeeArray.push(res[i].last_name);
        }
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: employeeArray
            },
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the new role ID for this employee?',
                choices: chooseRole()
            }
        ]).then((answers) => {
            let employeeId = employeeArray.indexOf(answers.employee) + 1
            connection.query('UPDATE employees SET ? WHERE ?',
                [
                    {
                        role_id: answers.newRole
                    },
                    {
                        id: employeeId
                    }
                ],
                function (err) {
                    if (err) throw err
                    console.log('Employee updated');
                    startQuestions();
                }
            );
        });
    });
}

function updateRole() {
    let roleArray = [];
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].last_name);
        }
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: employeeArray
            },
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the new role ID for this employee?',
                choices: chooseRole()
            }
        ]).then((answers) => {
            let roleId = roleArray.indexOf(answers.newRole) + 1
            connection.query('UPDATE employees SET ? WHERE ?',
                [
                    {
                        role_id: answers.newRole
                    },
                    {
                        id: employeeId
                    }
                ])
        }),
            function (err) {
                if (err) throw err
                console.log('Role updated');
                init();
            }


    })
}



init();




