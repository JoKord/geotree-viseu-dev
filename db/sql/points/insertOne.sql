INSERT INTO test.points(geom, point_name, street_id, zone_id)
VALUES (ST_SetSRID(ST_MakePoint(${lng^},${lat^}),4326), ${point_name}, ${street_id^}, ${zone_id^})
RETURNING id