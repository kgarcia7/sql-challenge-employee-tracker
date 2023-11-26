INSERT INTO department
    (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 2),
    ('Lead Engineer', 150000, 3),
    ('Software Engineer', 120000, 4),
    ('Account Manager', 160000, 5),
    ('Accountant', 125000, 6),
    ('Legal Team Lead', 250000, 7),
    ('Lawyer', 190000, 8);

    INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
    VALUES ('John', 'Smith', 001, 1),
        ('Emily', 'Johnson', 002, 2),
        ('Daniel', 'Brown', 003, 3), 
        ('Jessica', 'Miller', 004, 4),
        ('Ryan', 'Taylor', 005, 5);
