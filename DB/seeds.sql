
INSERT INTO department(title)
VALUES ('Musicians'),
        ('Roadies');

INSERT INTO roles (title, salary, department_id)
VALUES ('singer', 2000000.00, 1),
('drummer', 1500000.00, 1),
('guitarist', 150000.00, 1),
('bass player', 1500000.00, 1),
('lights tech', 800000.00, 2),
('sound tech', 75000.00, 2),
('bus driver', 500000.00, 2),
('tour manager', 1250000.00, 2),
('stage manager', 1250000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Axl', 'Daisy', 1, 9),
('Slash', 'Kittens', 3, 9),
('Duff', 'Stuff', 4, 9),
('Steven', 'Madler', 2, 9),
('Sam', 'Watts', 5, 8),
('Donnie', 'Decibel', 6, 8),
('Walker', 'Wheels', 7, 8),
('Tommy', 'Tours', 8, NULL),
('Sunny', 'Stager', 9, NULL);



