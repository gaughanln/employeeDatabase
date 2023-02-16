CREATE DATABASE nameHere;

USE nameHere;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
)

-- need to set id the primary key and link it to the role_id as the foreign key
CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- need to link the employee id to the manager_id 
CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  FOREIGN KEY (id)
  REFERENCES role(id)
  ON DELETE SET NULL
  manager_id INT NOT NULL,
)