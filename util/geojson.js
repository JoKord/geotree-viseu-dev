'use strict'
let gj = require('geojson');
module.exports = {
	parsePoint: (req, res, next) => {
		res.locals.data = gj.parse(res.locals.data, {Point: ['lat', 'lng']});
		next();
	},
	parsePoints: (req, res, next) => {
		res.locals.data = gj.parse(res.locals.data, {Point: ['lat', 'lng']});
		next();
	}
}