DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;
SELECT DATABASE();
CREATE TABLE departments (
id INT NOT NULL,
department_name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL,
role_name VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employees (
id INT NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
employee_salary INT,
PRIMARY KEY (id)
);

