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

const db = mongoose.connection;

/**
 * Bind connection to error event (to get notification of connection errors)
 */

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

db.once('open', function () {
    console.log("We are connected!")
});


/**
 * Define Register Schema
 */

const registerSchema = new mongoose.Schema({

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

    /** Specification of Email Address field **/
    email: {
        type: String,
        required: "Please enter your Email.",
        unique: "This email address already exists. Please enter another email.",
        trim: true,
        validate: {
            // Validate email to be of email format
            validator: function (v) {
                    return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
                },
                message: props => `${props.value} is not a valid Email address!`
            }
    },

    /** Specification of Password field **/
    password: {
        type: String,
        required: "Please enter your password.",
        trim: true,
        validate: {
            // Validate password to be strong
            validator: function (v) {
              return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/.test(v);
            },
            message: (props) =>
              `Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least of 6 characters.`,
        },
    }
});

/**
 * Validate register Schema using uniqueValidator
 */

registerSchema.plugin(uniqueValidator);

/**
 * Export Register Module to be used in Controller (routes)
 */

module.exports.Register = mongoose.model("Register", registerSchema);
