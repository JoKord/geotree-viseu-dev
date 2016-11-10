'use strict'
module.exports = (pgp, values) => {
	let table = new pgp.helpers.TableName('trees', 'test');
	let options = " WHERE id=" + values.id + " Returning *";
	return pgp.helpers.update(values.fields, Object.keys(values.fields), table) + options;
};