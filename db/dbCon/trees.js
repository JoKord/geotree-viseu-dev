'use strict';
let db = require('../').db;
module.exports = {
	getAll: (req, res, next) => {
		db.trees.findAll({point_id:req.params.pid}).then(data => {
			res.locals.data = data;
			return next();
		}).catch(err => next(err));	
	},
	getOne: (req, res, next) => {
		db.trees.findOne({pid:req.params.pid, id:req.params.id}).then(data => {
			res.locals.data = data;
			return next();
		}).catch(err => next(err));
	},
	insertOne: (req, res, next) => {
		req.body.pid = req.params.pid;
		db.trees.insertOne(req.body).then(data => {
			res.locals.data = data;
			return next();
		}).catch(err => next(err));
	},
	updateOne: (req, res, next) => {
		db.trees.updateOne(req.body).then(data => {
			res.locals.data = data;
			return next();
		}).catch(err => next(err));
	},
	patchOne: (req, res, next) => {
		let queryObj = {};	
			queryObj.id = req.params.id;
			queryObj.pid = req.params.pid;
			queryObj.fields = req.body;
		db.trees.patchOne(queryObj).then(data => {
			res.locals.data = data;
			return next();
		}).catch(err => next(err));
	},
	archiveOne:  (req, res, next) => {
		db.trees.archiveOne({pid:req.params.pid, id:req.params.id}).then(data => {
			return next();
		}).catch(err => next(err));
	}
};