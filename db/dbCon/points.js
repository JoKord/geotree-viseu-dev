'use strict';
let db = require('../').db;
module.exports = {
	getAll: (req, res, next) => {
		db.points.findAll().then(data => {
			res.locals.data = data;
			return next();
		}).catch(error => next(error));
	},
	getOne: (req, res, next) => {
		db.points.findOne({id:req.params.id}).then(data => {
			res.locals.data = data;
			return next();
		}).catch(error => next(error));
	},
	insertOne: (req, res, next) => {
		db.points.insertOne(req.body).then(data => {
			res.locals.data = req.body;
			res.locals.data.id = data;
			res.locals.id = data;
			return next();
		}).catch(error => next(error));},
	updateOne: (req, res, next) => {
		db.points.updateOne(req.body).then(data => {
			res.locals.data = data;
			return next();
		}).catch(error => next(error));
	},
	patchOne: (req, res, next) => {
		let queryObj = {};	
		queryObj.id = req.params.id;
		queryObj.fields = req.body;
		db.points.patchOne(queryObj).then(data => {
			res.locals.data = data;
			return next();
		}).catch(error => next(error));
	},
	deleteOne:  (req, res, next) => {
		db.points.deleteOne({id:req.params.id}).then(data => {
			return next();
		}).catch(error => next(error));
	}
};