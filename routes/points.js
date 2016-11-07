'use strict'
var express = require('express');
var router = express.Router();
const db = require('../db').db;
const validator = require('../util/validator');
const gj = require('../util/geojson');

router.get("/", (req, res, next) => {
	db.points.findAll().then(data => {
		res.locals.data = data;
		next();
	}).catch(error => next(error));
}, gj.parsePoints, validator.isValidPoints, (req,res,next) => {
	res.set('Content-Type', 'application/json');
	res.status(200).json(res.locals.data);	
});

router.get("/:id", (req, res, next) => {
	db.points.findOne({id:req.params.id}).then(data => {
		res.locals.data = data;
		return next();
	}).catch(error => next(error));
}, gj.parsePoint, validator.isValidPoint, (req,res,next) => {
	res.set('Content-Type', 'application/json');
	res.status(200).json(res.locals.data);
});

router.post("/", validator.isValidResource, (req, res, next) => {
	db.points.insertOne(req.body).then(data => {
		res.locals.data = req.body;
		res.locals.data.id = data;
		res.locals.id = data;
		return next();
	}).catch(error => next(error));
}, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(201).location(req.baseUrl+"/"+res.locals.id).json(res.locals.data);
});

router.delete("/:id", (req, res, next) => {
	db.points.deleteOne({id:req.params.id}).then(data => {
		res.status(204).send();
	}).catch(error => next(error));
});

router.put("/:id", validator.isValidResource, (req, res, next) => {
	db.points.updateOne(req.body).then(data => {
		res.locals.data = data;
		return next();
	}).catch(error => next(error));
}, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(200).json(res.locals.data);
});

router.patch("/:id", validator.isValidResource, (req, res, next) => {
	let queryObj = {};	
	queryObj.id = req.params.id;
	queryObj.fields = req.body;
	db.points.patchOne(queryObj).then(data => {
		res.locals.data = data;
		next();
	}).catch(error => next(error));
}, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(200).json(res.locals.data);
});

module.exports = router;