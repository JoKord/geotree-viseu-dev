var aGeoJSON = require('geojson-validation');
module.exports = {
	isValidPoint: (data, callback) => {
		aGeoJSON.valid(data, (bool, err) => {
			if(bool) return callback(err);
			aGeoJSON.isPoint(data, (bool, err) => {
				if(bool) return callback(err);
				return callback(err, data);
			});
		});
	},
};