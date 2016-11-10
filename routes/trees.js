'use strict';
let express = require('express');
let router = express.Router();
let dbTrees = require('../db/dbCon/trees');
let validator = require('../util/validator');
router.get('/points/:pid/trees', dbTrees.getAll, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.get('/points/:pid/trees/:id', dbTrees.getOne, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.post('/points/:pid/trees', dbTrees.insertOne, (req, res, next) => {
	res.status(201).location(req.baseUrl+req.path+"/"+res.locals.id).json(res.locals.data);
});
router.put('/points/:pid/trees/:id', validator.validateTreeFull, dbTrees.updateOne, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.patch('/points/:pid/trees/:id', validator.validateTree, dbTrees.patchOne, (req, res, next) => {
	res.status(200).json(res.locals.data);
});
router.delete('/points/:pid/trees/:id', dbTrees.archiveOne, (req, res, next) => {
	res.sendStatus(204);
});
module.exports = router;