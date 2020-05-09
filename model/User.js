"use strict";
const mongoose = require("mongoose");

//password will be changed into hash next update
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
        trim : true
    },
    password : {
        type : String, 
        required : true
    }
});

userSchema.statics.init = (User) => {
    let user = [{
        "username" : "a",
        "email" : "aaaa@outlook.com",
        "password" : "thispassword"
    },
    {
        "username" : "b",
        "email" : "bbbb@gmail.com",
        "password" : "thatpassword"
    }]
}

module.exports = mongoose.model("User", userSchema);