/*
	SQL QUERY FOR FINDING ONE TREE BY ID
*/
SELECT id, 
street_id, 
zone_id, 
point_name,
ST_X(ST_TRANSFORM(geom,4326)) as lat, 
ST_Y(ST_TRANSFORM(geom,4326)) as lng 
FROM ${schema~}.points
WHERE id=${id^}