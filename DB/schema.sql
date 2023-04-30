DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
id INT NOT NULL,
name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL,
title VARCHAR(50),
salary DECIMAL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL,
first_name VARCHAR(50),
last_name VARCHAR(50),
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

