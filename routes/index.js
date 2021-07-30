/**
 * Require the express module
 */

var express = require('express');
var router = express.Router();

/**
 * Require Random-Greetings module to display Random Greetings on Home Page
 */

var rg = require('random-greetings');

/**
 * Display Day on Home Page
 */

var today = new Date();
var day = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

/**
 * GET Home Page
 */

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Travel Agency',
        greet: rg.greet(),
        day: daylist[day],
        home: true
    });
});

/**
 * Exporting the created module
 */

module.exports = router;
