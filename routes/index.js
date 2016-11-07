var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('home',{'title':req.app.locals.AppName});
});

module.exports = router;
