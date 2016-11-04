'use strict'
var express = require('express');
var router = express.Router();
const db = require('../db').db;
const validator = require('../util/validator');


router.get("/", (req, res, next) => {
	db.points.findAll().then(data => {
		res.json(data);
	}).catch(error => next(error));
});

router.get("/:id", (req, res, next) => {
	db.points.findOne({id:req.params.id}).then(data => {
		validator.isValidPoint(data, (error, data) => {
			if(error) return next(error);
			res.status(200).json(data);
		});
	}).catch(error => next(error));
});

router.post("/", (req, res, next) => {
	let point = req.body;
	db.points.insertOne(req.body).then(data => {
		point.id = data;
		res.status(201).location(req.baseUrl+"/"+data).json(point);
	}).catch(error => next(error));
});

router.delete("/:id", (req, res, next) => {
	db.points.deleteOne({id:req.params.id}).then(data => {
		res.status(204).send();
	}).catch(error => next(error));
});

router.put("/:id", (req, res, next) => {
	db.points.updateOne(req.body).then(data => {
		res.set('Content-Type', 'application/json');
		res.status(200).send(data);
	}).catch(error => next(error));
});

router.patch("/:id", (req,res,next) => {
	let queryObj = {};	
	queryObj.id = req.params.id;
	queryObj.fields = req.body;
	db.points.patchOne(queryObj).then(data => {
		res.set('Content-Type', 'application/json');
		res.status(200).send(data);
	});
});

module.exports = router;