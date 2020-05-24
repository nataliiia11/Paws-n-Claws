"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


var userSchema = mongoose.Schema({
    username : {
        type : String,
        lowercase:true,
        unique : true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        trim : true
    },
    email : {
        type : String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        unique : true,
        trim : true,
        uniqueCaseInsensitive : true
    },
    password : {
        type : String, 
        required : true
    }}, {timestamps: true});



userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model("User", userSchema);