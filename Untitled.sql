SELECT employee.id, employee.first_name, employee.last_name, role.title
FROM employee LEFT JOIN role on employee.role_id = role.id 
WHERE employee.manager_id = 3
AND employee.id != employee.manager_id; 