/**
 * Require the express module
 */

var express = require('express');
var router = express.Router();

/**
 * Require the Register module created in RegisterMdl model
 */

const Register = require('../models/registerMdl').Register;

/**
 * GET Register Page
 */

router.get('/', function(req, res, next) {
  res.render('register');
});

/**
 * GET Thanks Page
 */

router.get('/thanks', function(req, res, next) {
    res.render("thanks", {
        title: 'Thank You'
    });
});

/**
 * POST Register Info
 */

router.post('/', function (req, res, next) {

    const registerusers = new Register(req.body);

    /*  Validation Errors in Register Schema */
    registerusers.save(err => {
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      
      /* Sending Validation Errors on Register page */
      return res.render("register", {
        errors: errorArray,
        noerrors: false,
        title: 'Register'
      });
    } 

    /* Display Thanks page if no Validation Errors */
    res.render("thanks",{
      name:registerusers.firstname,  // Thank the person by Name
      title: 'Thank You'
  });
  });
});

/**
 * Exporting the created module
 */

module.exports = router;
