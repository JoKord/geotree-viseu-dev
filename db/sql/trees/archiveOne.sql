UPDATE ${schema~}.trees 
SET "state" = 'MORTA', "isAlive" = false
WHERE id = ${id^} AND id_point=${pid^} 