/**
 * Require the express module
 */

var express = require('express');
var router = express.Router();

/**
 * Require the Contacts module created in ContactMdl model
 */

const contacts = require('../models/contactMdl').Contact;

/**
 * GET Contact Us Page
 */

router.get('/', function(req, res, next) {

    /* Find contact informtion of last contacted visitor from DB */

    contacts.findOne({$query: {}, $orderby: {$natural : -1}}, (err, contacts) => {
    
        /* Sending information of last contacted visitor to pug file and Displaying it on Contact page */
        res.render('contact',{
            title: 'Contact Us',
            noerrors: true,
            date: contacts.created, 
            country: contacts.zone 
        });

        /*  Console.log the entire contact form information of last contacted visitor to Terminal */
        console.log("\n \n ========== Logging Data of last Accessed Visitor to Console: ========== \n");
        console.log(contacts);
    });
});


/**
 * GET Thank you Page
 */

router.get('/thankyou', function(req, res, next) {
    res.render("thankyou", {
        title: 'Thank You'
    });
});


/**
 * POST Contact Info
 */

router.post('/', (req, res, next) => {

    var contact = new contacts(req.body);

    /*  Add Contact form to page and console.log all values */
    console.log("\n \n ========== Logging Data to Console: ========== \n");
    console.log(contact);
    console.log("\n First Name: " + contact.firstname + "\n Last Name: " + contact.lastname + "\n Email: " + contact.mail + "\n Comments: " + contact.comment + "\n Send Newsletter: " + (contact.lab == undefined ? "No": "Yes") +"\n");
    
    /*  Validation Errors in Contact Schema */
    contact.save(err => {
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            
            /* Sending Validation Errors on Contact page */
            return res.render("contact", {
            errors: errorArray,
            noerrors: false,
            title: 'Contact Us'
        });
    }

    /* Redirect to Thank You page after submitting Contact form, if no Validation Errors */
    res.render("thankyou",{
        name:contact.firstname, // Thank the person by Name
        title: 'Thank You'
    });
});
});

/**
 * Exporting the created module
 */

module.exports = router;
