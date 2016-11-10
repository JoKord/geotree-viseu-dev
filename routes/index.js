'use strict';
var express = require('express');
var router = express.Router();
router.get('/', (req, res, next) => {
	res.render('home',{'title':req.app.locals.AppName});
});
module.exports = router;