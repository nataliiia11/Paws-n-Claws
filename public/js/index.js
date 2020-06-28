"use strict";

window.onload = () => {
    console.log("windows loaded"); 
    document.getElementById("login-form-container").style.display = "none";
    document.getElementById("parallax").style.display = "flex";               
}

const parallax = document.getElementById("parallax");

//buttons
const loginFormButton = document.getElementById("login-direction");
const loginFormCloseButton = document.getElementById("close-login-form-container-button");
const signUpFormButton = document.getElementById("signup");
const signInButton = document.getElementById("sign-in-button");
const signUpButton = document.getElementById("sign-up-button");

//containers
const loginFormContainer = document.getElementById("login-form-container");
const signUpPromptContainer = document.getElementById("signup-prompt-container");

//username, password, email , new password, new email (container)
const emailContainer = document.getElementById("email-container");

//username, password, email, new password, new email
const usernameForm = document.getElementById("username");
const emailForm = document.getElementById("email");
const passwordForm = document.getElementById("password");

/**
 * To show login form from hidden
 */
loginFormButton.addEventListener("click", () => {
    loginFormContainer.style.display = "flex";
    usernameForm.focus();
    parallax.style.display = "none";   
});


/**
 * To close login form from being shown
 */
loginFormCloseButton.addEventListener("click", () => {
    loginFormContainer.style.display = "none";
    
    parallax.style.display = "flex"; 
    emailContainer.style.display = "none";
    
    signInButton.style.display = "block";
    signUpButton.style.display = "none";

    signUpPromptContainer.style.display = "";
});

signUpFormButton.addEventListener("click", () => {
    emailContainer.style.display = "flex";
    signUpPromptContainer.style.display = "none";
    signInButton.style.display = "none";
    signUpButton.style.display = "block";
});

signInButton.addEventListener("click", () => {
    fetch("/user/login", {
        method: 'POST',
        headers: {'content-type' : 'application/json;charset=UTF-8'},
        body : JSON.stringify({
            username : usernameForm.value,
            password : passwordForm.value
        })
    })
    .then((Response) => {
        Response.json()
        .then((data) => {
            if(data.loggedIn) {
                location.replace("/user/personal");
            } else {
                window.location.reload();
            }
        });
    });
});

signUpButton.addEventListener("click", () => {
    fetch("/user/register",
    {
        method : 'POST',
        headers : {"content-type" : "application/json;charset=UTF-8"},
        body: JSON.stringify({
            username : usernameForm.value,
            email : emailForm.value,
            password : passwordForm.value
        })
    }).then((Response) => {
        if(Response.ok)
            window.location.reload();
    });
});