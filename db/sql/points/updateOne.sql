UPDATE test.points 
	SET geom = ST_SetSRID(ST_MakePoint(${lng^},${lat^}),4326), 
		street_id = ${street_id^}, 
		zone_id = ${zone_id^}, 
		point_name = ${point_name}
	WHERE id = ${id^}
RETURNING 
id,
ST_X(ST_TRANSFORM(geom,4326)) as lat, 
ST_Y(ST_TRANSFORM(geom,4326)) as lng ,
street_id,
zone_id,
point_name