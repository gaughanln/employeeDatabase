    INSERT INTO department (id, name)
    VALUES (01, "Marketing"),
           (02, "Sales"),
           (03, "Legal"),
           (04, "Finance"),
           (05, "Customer Service");

    INSERT INTO role (id, title, salary, department_id)
    VALUES (01, "Marketing Manager", 80000.00, 100),
           (02, "Marketing Coordinator", 65000.00, 200),
           (03, "Sales Rep", 55000.00, 300),
           (04, "Sales Lead", 75000.00, 400),
           (05, "Lawyer", 95000.00, 500),
           (06, "Accountant", 70000.00, 600),
           (07, "Customer Service Rep", 50000.00, 700);

    INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES (01, "John", "Smith", 101, 201)
           (02, "Lindsey", "Gaughan", 102, 202)