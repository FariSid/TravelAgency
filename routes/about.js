/**
    * Name: Fariha Siddiqui
    * Student ID: 000880957
    * Date: 26-07-2021
    * Purpose: Assignment 1-6 of CPRG-008
    **/

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
