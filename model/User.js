"use strict";
const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    Name : String,
    email : String,
    password : String
})

module.exports = mongoose.model("User", userSchema);