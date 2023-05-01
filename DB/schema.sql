DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(50) NOT NULL

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
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
    
);

