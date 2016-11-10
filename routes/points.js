'use strict'
var express = require('express');
var router = express.Router();
let dbPoints = require('../db/dbCon/points');
let validator = require('../util/validator');
let gj = require('../util/geojson');
router.get("/points/", dbPoints.getAll, gj.parsePoints, validator.isValidPoints, (req,res,next) => {
	res.status(200).json(res.locals.data);	
});
router.get("/points/:id", dbPoints.getOne, gj.parsePoint, validator.isValidPoint, (req,res,next) => {
	res.status(200).json(res.locals.data);
});
router.post("/points/", validator.validatePoint, dbPoints.insertOne, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(201).location(req.baseUrl+req.path+"/"+res.locals.id).json(res.locals.data);
});
router.put("/points/:id", validator.validatePoint, dbPoints.updateOne, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.patch("/points/:id", validator.validatePoint, dbPoints.patchOne, gj.parsePoint, validator.isValidPoint, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.delete("/points/:id", dbPoints.deleteOne, (req, res, next) => {
	res.status(204).send();
});
module.exports = router;