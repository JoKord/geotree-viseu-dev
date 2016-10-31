SELECT EXISTS( 
	SELECT permission_name
	FROM 
		users.roles r,
		users.permissions p,
		users.role_permissions rp
	WHERE
		r.role_name = ${role} AND
		rp.id_role = r.id AND
		p.permission_name = ${perm} AND
		rp.id_permission = p.id
	)::int 
as has_permission