//
// module for setting Wind Speed of the wind fan
//
var DLserialListener = require('../serialListener');



var express = require('express');
var router = express.Router();

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('mainScreen Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('mainScreen get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('mainScreen post');

			console.log('mainScreen serialCall done: '+serialCall);

   
})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.seeValue = req.body.value;
	res.redirect('index');
})

router.get('/about', function(req, res){
	res.send('wind speed About page');
})

module.exports = router;

	