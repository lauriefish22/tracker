## SITE

[Recording]()

## Example

![pic](./public/assets/Screenshot%202023-04-27%20at%204.59.49%20PM.png)

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

This is a snippet of code using Express to retrieve parsed JSON data.

```app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);

        } else {
            const parseData = JSON.parse(data);
            res.send(parseData);
        }
    })})

```

## Learning Points

This was a great opportunity to learn more about MySql and how to create, combine, insert and delete tables and it's components.
