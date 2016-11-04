INSERT INTO test.points(geom, point_name, street_id, zone_id)
VALUES (${geom}, ${point_name}, ${street_id^}, ${zone_id^})
RETURNING id