/*
	SQL QUERY FOR FINDING ONE TREE BY ID
*/

SELECT id, 
	estado, 
	ST_X(ST_TRANSFORM(geom,4326)) as lat, 
	ST_Y(ST_TRANSFORM(geom,4326)) as lng 
	FROM ${schema~}.${table~}
	WHERE id=${id^}