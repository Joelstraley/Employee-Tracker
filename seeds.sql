USE employeeTrackerDB;

INSERT INTO department (id, name)
VALUES (1, "HR"); 
INSERT INTO department (id, name)
VALUES (2, "Legal"); 
INSERT INTO department (id, name)
VALUES (3, "Sales"); 
INSERT INTO department (id, name)
VALUES (4, "Engineering"); 

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Administrator", 25000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "HR Manager", 45000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Paralegal", 50000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Agency Attorney", 80000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Sales Representative", 40000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Sales Manager", 60000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Junior Developer", 60000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Senior Software Engineer", 100000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Jim","Davis", 1, 2); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2,"Gary","Larson",1, 2); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Bill", "Waterson", 2, 2); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Hunter S", "Thompson", 3, 5); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Raoul", "Duke", 4, 5); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Abbie", "Hoffman", 5, 8); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "John", "Brown", 5, 8); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Kwame", "Ture", 6, 8); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Joan", "Didion", 7, 11); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Fyodor", "Dostoevsky", 7, 11); 
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Henry", "Miller", 8, 11); 
