/**
    * Name: Fariha Siddiqui
    * Student ID: 000880957
    * Date: 26-07-2021
    * Purpose: Assignment 1-6 of CPRG-008
    **/


/**
 * Require the mongoose module
 */

var mongoose = require('mongoose');

/**
 * Set up a mongoose connection to DB: TravelAgency
 */

// var mongoDB = "mongodb://localhost:27017/contacts";
var mongoDB = "mongodb+srv://Fariha_user:FARIHA_SIDDIQUI@cluster0.9brjs.mongodb.net/TravelAgency?retryWrites=true&w=majority";

/**
 * Require the mongoose unique validator module
 */

const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(mongoDB,
    { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Get Mongoose DB connection
 */

var db = mongoose.connection;

/**
 * Get Date in en-us format to store in DB
 */

let date = new Date();  
let options = {  
    day: "numeric", hour: "2-digit", minute: "2-digit",
    weekday: "long", year: "numeric", month: "short"
};

today = date.toLocaleTimeString("en-us", options); 

/**
 * Get TimeZone of the user to store in DB
 */

var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Bind connection to error event (to get notification of connection errors)
 */

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("We are connected!")
});


/**
 * Define Contact Schema
 */

const contactSchema = new mongoose.Schema({

    /** Specification of First Name Field **/
    firstname: {
        type: String,
        required: "Please enter your First Name.",
        trim: true,
        validate: { 
            // Validate First Name - cannot have special characters and numbers
            validator: function (v) {
                    return /^[a-zA-Z]+$/.test(v);
                },
                message: props => `${props.value} is not a valid First Name!`
            }
    },

    /** Specification of Last Name Field **/
    lastname: {
        type: String,
        required: "Please enter your Last Name.",
        trim: true,
        validate: {
            // Validate Last Name - cannot have special characters and numbers
            validator: function (v) {
                    return /^[a-zA-Z]+$/.test(v);
                },
                message: props => `${props.value} is not a valid Last Name!`
            }
    },

    /** Specification of Date Field to contacted date in DB **/
    created: {
        type: String,
        default: today
    },

    /** Specification of TimeZone field to save user's timezone in DB **/
    zone: {
        type: String,
        default: timeZone
    },

    /** Specification of Email Address field **/
    email: {
        type: String,
        required: "Please enter your Email.",
        trim: true,
        validate: {
            // Validate email to be of email format
            validator: function (v) {
                    return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
                },
                message: props => `${props.value} is not a valid Email address!`
            }
    },

    /** Specification of Comment field to save User's Comments or Questions **/
    comment: {
        type: String,
        required: "Please write your comments/questions.",
        trim: true,
        validate: {
            // Validate comments - cannot be < 5 character
            validator: function (v) {
                    return v.length > 5;
                },
                message: `Comment is too short!`,
            }
    }
});

/**
 * Validate contact Schema using uniqueValidator
 */

contactSchema.plugin(uniqueValidator);

/**
 * Export Contact Module to be used in Controller (routes)
 */

module.exports.Contact = mongoose.model("Contact", contactSchema);
