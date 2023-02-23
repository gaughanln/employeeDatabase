    INSERT INTO department (id, name)
    VALUES (01, "Marketing"),
           (02, "Sales"),
           (03, "Legal"),
           (04, "Finance"),
           (05, "Customer Service");

    INSERT INTO role (id, title, salary, department_id)
    VALUES (101, "Marketing Manager", 80000.00, 01),
           (102, "Marketing Coordinator", 65000.00, 01),
           (103, "Sales Rep", 55000.00, 02),
           (104, "Sales Lead", 75000.00, 02),
           (105, "Lawyer", 95000.00, 03),
           (106, "Accountant", 70000.00, 04),
           (107, "Customer Service Rep", 50000.00, 05);

    INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES (01, "John", "Smith", 101, NULL),
           (02, "Lindsey", "Gaughan", 102, 01);