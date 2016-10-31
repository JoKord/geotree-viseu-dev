SELECT username, role_name as role 
FROM users.users u 
JOIN users.roles r ON u.id_role = r.id
WHERE u.id = ${id} 