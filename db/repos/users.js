'use strict';
var sql = require('../sql').users;
var bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = (rep, pgp) => {
	return {
		findOne: values =>
			rep.oneOrNone(sql.findOne, values),
		findOneByID: values =>
			rep.oneOrNone(sql.findOneByID, values),
		validatePassword: (data, hash) =>
			bcrypt.compareSync(data, hash),
		generatePassword: (password) =>
			bcrypt.hashSync(password, saltRounds), 
	};
};