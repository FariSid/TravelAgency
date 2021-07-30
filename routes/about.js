/**
 * Require the express module
 */

var express = require('express');
var router = express.Router();

/**
 * GET About Us Page
 */

router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About Us',
    });
});

/**
 * Exporting the created module
 */

module.exports = router;
