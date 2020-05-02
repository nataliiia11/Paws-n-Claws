"use strict";

window.onload = () => {
    console.log("windows loaded");                
}

var showLoginForm = function () {
    document.getElementById("login-form-container").style.display = "flex";
    document.getElementById("parallax").style.display = "none";    
}

var closeLoginForm = function () {
    document.getElementById("login-form-container").style.display = "none";
    document.getElementById("parallax").style.display = "flex"; 
}