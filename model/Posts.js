"use strict";
const mongoose = require("mongoose");
var postSchema = mongoose.Schema({
    content : String,
    signInUser: String
    
})


module.exports = mongoose.model("Post", postSchema);