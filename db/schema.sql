DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id  INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE empoyee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name  VARCHAR(30)
    last_name  VARCHAR(30)
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)

);