'use strict';
var aGeoJSON = require('geojson-validation');
module.exports = {
	isValidPoint: (req, res, next) => {
		aGeoJSON.valid(res.locals.data, (bool, err) => {
			if(!bool) return next(err);
			aGeoJSON.isPoint(res.locals.data.geometry, (bool, err) => {
				if(!bool) return next(err);
				return next();
			});
		});
	},
	isValidPoints: (req, res, next) => {
		aGeoJSON.valid(res.locals.data, (bool, err) => {
			if(!bool) return next(err);
			aGeoJSON.isFeatureCollection(res.locals.data, (bool,err) =>{
				if(!bool) return next(err);
				return next();
			});
		});
	},
	validatePoint: (req, res, next) => {
		let point = req.body;
		let err = new Error();
		err.status = 422;
		if(point.hasOwnProperty('lat') && typeof point.lat !== "number")
			err.message = 'Latitude should be a number';
		if(point.hasOwnProperty('lng') && typeof point.lng !== "number")
			err.message = 'Longitude should be a number';
		if(point.hasOwnProperty('street_id') && typeof point.street_id !== "number")
			err.message = 'Street_id should be a number';
		if(point.hasOwnProperty('zone_id') && typeof point.zone_id !== "number")
			err.message = 'Zone_id should be a number';
		if(err.message)
			next(err);
		next();
	},
	validateTreeFull: (req, res, next) => {
		let tree = req.body;
		let err = new Error();
		err.status = 422;
		if(!tree.hasOwnProperty('id') || typeof tree.id !== "number")
			err.message = 'Problem found with Tree.id property';
		if(!tree.hasOwnProperty('id_point') || typeof tree.id_point !== "number")
			err.message = 'Problem found with Tree.id_point property';
		if(!tree.hasOwnProperty('state') || typeof tree.state !== "string")
			err.message = 'Problem found with Tree.status property';
		if(!tree.hasOwnProperty('isAlive') || typeof tree.isAlive !== "boolean")
			err.message = 'Problem found with Tree.isAlive property';
		if(err.message)
			next(err);
		next();	
	},
	validateTree: (req, res, next) => {
		let tree = req.body;
		let err = new Error();
		err.status = 422;
		if(tree.hasOwnProperty('id') && typeof tree.id !== "number")
			err.message = 'Problem found with Tree.id property';
		if(tree.hasOwnProperty('id_point') && typeof tree.id_point !== "number")
			err.message = 'Problem found with Tree.id_point property';
		if(tree.hasOwnProperty('state') && typeof tree.state !== "string")
			err.message = 'Problem found with Tree.status property';
		if(tree.hasOwnProperty('isAlive') & typeof tree.isAlive !== "boolean")
			err.message = 'Problem found with Tree.isAlive property';
		if(err.message)
			next(err);
		next();	
	}
};