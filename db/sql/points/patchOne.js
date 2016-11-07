'use strict'
module.exports = (pgp, values) => {
	let table = new pgp.helpers.TableName('points', 'test');
	let options = " WHERE id=" + values.id + " Returning id,ST_X(ST_TRANSFORM(geom,4326)) as lat,ST_Y(ST_TRANSFORM(geom,4326)) as lng ,street_id,zone_id,point_name";
	return pgp.helpers.update(values.fields, Object.keys(values.fields), table) + options;
};