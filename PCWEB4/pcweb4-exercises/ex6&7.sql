CREATE DATABASE company_database;
USE company_database;


CREATE TABLE clients(
    client_id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(50)
);
--@block
CREATE TABLE employees(
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    salary INT,
    super_id INT,
    FOREIGN KEY (super_id) REFERENCES employees (emp_id) ON DELETE SET NULL
);

CREATE TABLE works_with(
    emp_id INT NOT NULL,
    client_id INT NOT NULL,
    total_sales INT NOT NULL,
    PRIMARY KEY (emp_id, client_id), 
    FOREIGN KEY (emp_id) REFERENCES employees (emp_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients (client_id) ON DELETE CASCADE
);

INSERT INTO employees VALUES(101,"Jordan",250000,NULL);
INSERT INTO employees VALUES(102,"Lucas",110000,101);
INSERT INTO employees VALUES(103,"Jason",100000,101);
INSERT INTO employees VALUES(104,"Bill",140000,101);
INSERT INTO employees VALUES(105,"Ryan",90000,102);
INSERT INTO employees VALUES(106,"Mark",90000,104);
INSERT INTO employees VALUES(107,"Joshua",85000,102);
INSERT INTO employees VALUES(108,"Alan",80000,103);
INSERT INTO employees VALUES(109,"Charlie",95000,103);
INSERT INTO employees VALUES(110,"Leonard",80000,104);

INSERT INTO clients VALUES(201,"Google");
INSERT INTO clients VALUES(202,"Amazon");
INSERT INTO clients VALUES(203,"Facebook");
INSERT INTO clients VALUES(204,"Apple");
INSERT INTO clients VALUES(205,"Netflix");
INSERT INTO clients VALUES(206,"Samsung");
INSERT INTO clients VALUES(207,"Huawei");
INSERT INTO clients VALUES(208,"Dell");
INSERT INTO clients VALUES(209,"IBM");
INSERT INTO clients VALUES(210,"Sony");
INSERT INTO clients VALUES(211,"Panasonic");
INSERT INTO clients VALUES(212,"Intel");
INSERT INTO clients VALUES(213,"Lenovo");
INSERT INTO clients VALUES(214,"LG");
INSERT INTO clients VALUES(215,"Hitachi");
INSERT INTO clients VALUES(216,"HP");
INSERT INTO clients VALUES(217,"Microsoft");
INSERT INTO clients VALUES(218,"Foxconn");
INSERT INTO clients VALUES(219,"Asus");
INSERT INTO clients VALUES(220,"Acer");

INSERT INTO works_with VALUES(104,201,200000);
INSERT INTO works_with VALUES(104,203,350000);
INSERT INTO works_with VALUES(102,202,150000);
INSERT INTO works_with VALUES(102,204,160000);
INSERT INTO works_with VALUES(103,217,280000);
INSERT INTO works_with VALUES(103,218,320000);
INSERT INTO works_with VALUES(103,206,140000);
INSERT INTO works_with VALUES(105,205,90000);
INSERT INTO works_with VALUES(105,216,87000);
INSERT INTO works_with VALUES(106,209,64000);
INSERT INTO works_with VALUES(106,215,102000);
INSERT INTO works_with VALUES(107,214,78000);
INSERT INTO works_with VALUES(107,210,92000);
INSERT INTO works_with VALUES(108,207,95000);
INSERT INTO works_with VALUES(108,208,45000);
INSERT INTO works_with VALUES(108,220,64000);
INSERT INTO works_with VALUES(109,219,75000);
INSERT INTO works_with VALUES(109,211,78000);
INSERT INTO works_with VALUES(110,212,50000);
INSERT INTO works_with VALUES(110,213,94000);

--@block
SELECT * FROM employees;
SELECT * FROM works_with;
SELECT * FROM clients;

--@block Ex6 employees w salary > 90000
SELECT *
FROM employees
WHERE salary > 90000;

--@block Ex 7 employees' ids/names &N clients' id/names whose total sales > 100000
SELECT works_with.emp_id, employees.name, works_with.client_id, clients.client_name
FROM works_with
INNER JOIN employees ON
works_with.emp_id = employees.emp_id
INNER JOIN clients ON
works_with.client_id = clients.client_id
WHERE total_sales > 100000;