//const { default: Choices } = require('inquirer/lib/objects/choices.js');
const connection = require('./config/connection');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3006;
const db = connection;
class Tracker {
    type;
    name;
    message;
    choices;
    constructor(type, name, message, choices) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.choices = choices;
    }
}


function init() {
    let questionArray = ['View department',
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
        'I am finished'];


    let startPrompt = new Tracker('list', 'choices', 'what would you like to do', questionArray);

    inquirer.prompt(
        {
            type: startPrompt.type,
            name: startPrompt.name,
            message: startPrompt.message,
            choices: startPrompt.choices
        })
        .then((answer) => {
            console.log(answer);
            if (answer.choices === 'View department') {
                viewDepartments();
            } else if
                (answer.choices === 'View employees') {
                viewEmployees();
            }
            else if (answer.choices === 'View roles') {
                viewRoles();
            }
            else if (answer.choices === 'Add a department') {
                addDepartment();
            }
            else if (answer.choices === 'Add an employee') {
                addEmployee();
            }
            else if (answer.choices === 'Add a role') {
                addRole();
            }
            else if (answer.choices === 'Update a department') {
                updateDepartment();
            }
            else if (answer.choices === 'Update an employee') {
                updateEmployee();

            }
            else if (answer.choices === 'Update a role') {
                updateRole();

            }
            else if (answer.choices === 'Delete a department') {
                deleteDepartment();

            }
            else if (answer.choices === 'Delete an employee') {
                deleteEmployee();

            }
            else if (answer.choices === 'Delete e a role') {
                deleteRole();

            }
            else if (answer.choices === 'See department budget') {
                seeBudget();

            }
            else if (answer.choices === 'I am finished') {
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
    });

}
function viewRoles() {
    db.query('SELECT * FROM roles', function (err, result) {
        if (err) console.log(err)        // console.log(result);
        console.table(result);
        init();
    });
}
function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, result) {
        console.table(result);
        init();
    });
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
        ]).then((answer) => {
            let employeeId = employeeArray.indexOf(answer.employee) + 1
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
    db.query('SELECT * from employees', function (err, res) {
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            employees.push('' + res[i].first_name + ' ' + res[i].last_name);
            console.log(employees[i]);
        }
        inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ])
            .then((answer) => {
                console.log(answer);
                let employee = answer.employee;
                let roles = [];
                db.query('SELECT * from roles', function (err, res) {
                    for (let i = 0; i < res.length; i++) {
                        roles.push(res[i].title);
                        //console.log(roles[i]);
                    }
                    inquirer.prompt(
                        {
                            name: 'role',
                            type: 'list',
                            message: 'What is the new role for the employee?',
                            choices: roles
                        })
                        .then((answer) => {
                            console.log(answer);
                            let updatedRole = 99;
                            for (let i = 0; i < res.length; i++) {
                                if (res[i].title === answer.role)
                                    updatedRole = res[i].id;
                            }
                            let [first, last] = employee.split(" ");
                            db.query(`UPDATE employees SET role_id = '${updatedRole}' WHERE first_name = '${first}' AND last_name = '${last}'`, function (err, res) {
                                if (err) console.log(err)
                                else console.log(res);
                                init();
                            });
                        });
                });
            });
    });
}



function addDepartment() {

    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'Enter the name of the new department'
        }
    ]).then((answer) => {
        let sql = 'INSERT INTO department (title) VALUES (?) ';
        db.query(sql, answer.newDept, (err, res) => {
            console.log(answer); if (err) console.log(err);
            else {
                console.log(`${answer.newDept} entered`);
                init();
            }
        });
    });
};


function addRole() {
    const findDept = 'SELECT * FROM department';
    db.query(findDept, (err, response) => {
        if (err) throw err;

        //const alldepts = results.map((dept) => dept.department_name);

        inquirer.prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the title of the new role?'
            },
            {
                name: 'newDept',
                type: 'input',
                message: 'Which department does this role belong to?'
            },

            {
                name: 'newSalary',
                type: 'input',
                message: 'What is the Salary?'
            }

        ]).then((answers) => {

            const idDept = 'SELECT id FROM department where title = ?';
            db.query(idDept, answers.newDept, (err, response) => {

                if (err) throw err;
                const dept_id = response[0].id;
                const newRoleInfo = { title: answers.newRole, salary: answers.newSalary, department_id: department_id };

                db.query('INSERT INTO roles SET ?', newRoleInfo, (err) => {
                    if (err) throw err;
                    console.log(`${answers.newRole} has been created in ${answers.newDept}`);
                    viewRoles();
                });
            });
        });
    });
}



function addEmployee() {
    inquirer.prompt([
        {
            name: 'new_first_name',
            type: 'input',
            message: 'Enter the first name'
        },
        {
            name: 'new_last_name',
            type: 'input',
            message: 'Enter the last name'
        },
        {
            name: 'new_salary',
            type: 'number',
            message: 'Please enter the salary'
        },
        {
            name: 'new_role',
            type: 'input',
            message: 'Which role would you like to assign to this employee?',

        },
        {
            name: 'new_manager',
            type: 'input',
            message: 'Which manager would you like to assign this employee to?',

        },
        {
            name: 'new_department',
            type: 'input',
            message: 'Which department would you like to assign this employee to?',

        }

    ]).then((answers) => {
        connection.query`(INSERT INTO employee(first_name, last_name, salary, role, manager, department)
        VALUES
                    ('${answers.new_first_name}', '${answers.new_last_name}', '${answers.new_Salary}', '${answers.new_manager}', '${answers.new_department}', `
        if (err) throw err;
        console.log(`${answer} entered`);
        viewDepartments();
    });









}

module.exports = { addRole, addEmployee, addDepartment }


init();




