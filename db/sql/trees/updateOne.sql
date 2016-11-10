UPDATE ${schema~}.trees 
	SET state = ${state}, 
		"isAlive" = ${isAlive}
	WHERE id = ${id^} AND id_point = ${id_point^}
RETURNING *