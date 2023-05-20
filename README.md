## SITE

[Recording](https://drive.google.com/file/d/1KPqZRFuwmp-K8fEHT7JEBAsnfTi2x9tS/view)

## Example

![pic](./db/Screenshot%202023-05-04%20at%2010.14.26%20AM.png)

## Description

This project enables the user to manage employee data with the command line. The user is able to view all departments, roles and employee information as well as make changes to adjust the roles, salary, managers and general employee information.

## Technology Used and Credit

-   [Express]('https://expressjs.com/')
-   [NodeJS]('https://nodejs.org/en')
-   [Inquirer]('https://www.npmjs.com/package/inquirer')
-   [MySql]('https://dev.mysql.com/doc/refman/8.0/en/')
-   [Console.table]('https://www.npmjs.com/package/console.table')

## Installations

-   NodeJS
-   Express
-   Inquirer
-   Mysql
-   Dotenv

## Code Example

This is a snippet of code showing part of one of the more complex function which updates the roles.

```function updateRole() {
    db.query('SELECT * from employees', function (err, res) {
        let employees = [];
        for (let i = 0; i < res.length; i++) {
            employees.push('' + res[i].first_name + ' ' + res[i].last_name);
            console.log(employees[i]);
        }})}

```

## Learning Points

This was a great opportunity to learn more about MySql and how to create, combine, insert and delete tables and it's components.
