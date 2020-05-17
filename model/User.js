"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


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


   

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);