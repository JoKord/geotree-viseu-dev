UPDATE test.points 
	SET geom = ${geom}, 
		street_id = ${street_id^}, 
		zone_id = ${zone_id^}, 
		point_name = ${point_name}
	WHERE id = ${id^}
RETURNING *