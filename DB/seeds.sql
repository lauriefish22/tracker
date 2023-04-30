INSERT INTO department (name)
VALUES ('Musicians'), 
        ('Roadies'):

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, 'singer', 2000000.00, 1),
(2, 'drummer', 1500000.00, 1),
(3, 'guitarist', 150000.00, 1),
(4, 'bass player', 1500000.00, 1),
(5, 'lights tech', 800000.00, 2),
(6, 'sound tech', 75000.00, 2),
(7, 'bus driver', 500000.00, 2),
(8, 'tour manager', 1250000.00, 2),
(9, 'stage manager', 1250000.00, 1):

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Axl', 'Daisy' 1, 9),
(2, 'Slash', 'Kittens' 3, 9),
(3, 'Duff', 'Stuff' 4, 9),
(4, 'Steven', 'Madler' 2, 9),
(5, 'Sam', 'Watts' 5, 8),
(6, 'Donnie', 'Decibel' 6, 8),
(7, 'Walker', 'Wheels' 7, 8),
(8, 'Tommy', 'Tours' 8, NULL),
(9, 'Sunny', 'Stager' 9, NULL):



