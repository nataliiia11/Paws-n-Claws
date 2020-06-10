"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const passportLocalMongoose=require('passport-local-mongoose');
const bcrypt = require("bcrypt")

var userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        uniqueCaseInsensitive : true
    },
    password : {
        type : String, 
        required : true
    }

       
});


   userSchema.pre("save", function(next) { 
    let user = this;
    bcrypt.hash(user.password, 10).then(hash => { 
    user.password = hash;
    next();
    })
    .catch(error => {
    console.log(`Error in hashing password: ${error.message}`);
    next(error);
    });
   });
   userSchema.methods.passwordComparison = function(inputPassword){ 
    let user = this;
    return bcrypt.compare(inputPassword, user.password); 
   };
   
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
// userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);