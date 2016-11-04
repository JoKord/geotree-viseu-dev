'use strict'
let gj = require('geojson');
module.exports = {
	parseGeoJSON: (req, res, next) => gj.parse(res.body, {Point: ['lat','lng']}),
}