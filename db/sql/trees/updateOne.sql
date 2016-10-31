UPDATE test.tree 
SET estado = ${estado}
WHERE id = ${id^}
RETURNING id