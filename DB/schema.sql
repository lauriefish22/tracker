DROP DATABASE IF EXISTS tracker_DB;
CREATE DATABASE tracker_DB;

USE tracker_DB;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(50) NOT NULL,

);

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(50),
salary DECIMAL,
department_id INT,

FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
roles_id INT,
manager_id INT,
FOREIGN KEY (roles_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

