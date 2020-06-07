"use strict";
const Users = require("../model/User");
const Posts = require("../model/Posts");
const bcrypt = require("bcrypt");
const passport = require("passport") 
const fields = ['username', 'email', 'password']

//initialize database
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', () => {
    Users.init();
}
)

exports.findAllUser = (req, res) => {
    Users.find()
        .exec()
        .then((users) => {
           return res.send(users)
        })
}

exports.saveUser = (req, res) => {
    var password = "";
    if(req.body.password != "") password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body.password);
    let user = {
        'username' : req.body.username,
        'email'  : req.body.email,
        'password' : password};

    const newUser = new Users(user);

    newUser.save(newUser, (err, result) => {
        if (err) {
            return res.send(false);
        }
        return res.send(true);
    })
}

exports.create= (req, res, next) => {
    if (req.skip) next();
    let newUser = new Users( getUserParams(req.body) );
 Users.register(newUser, req.body.password, (error, user) => { 
 if (user) {
 req.flash("success", `${user.username}'s account created
successfully!`);
 res.locals.redirect = `/${user.username}`;
 next(); 
 } else {
 req.flash("error", `Failed to create user account because:
${error.message}.`);
 res.locals.redirect = "/";
 next(); 
 }
 });
}

exports.signIn = (req,res,next) => {
    const userPage=req.params.page;
    res.type("application/json")
    Users.findOne({"username" : req.body.username})
    .then((result) => {
        if(result == null) return res.send(JSON.stringify({"result" : false}));
        const dbPassword = result.password;
        bcrypt.compare(req.body.password, dbPassword, (err, result) => {
            if (err) throw err;
            result = JSON.stringify(
                {
                    "result" : true,
                    "token" : dbPassword
                }
            );
            console.log(result);
            return res.send(result);
            
                });
                next();
    }) 
}



   

  exports.redirectView=(req, res, next) => {
    const redirectPath = res.locals.redirect
    if (redirectPath !== undefined) res.redirect(303, redirectPath)
    else next()
  }

  exports.validate=(req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
  
    req.check("password", "Password cannot be empty").notEmpty().isLength({
        min: 5,
      });
    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/";
        next();
      } else {
        next();
      }
    });
  }

exports.getUserParams= (body) => { 
    return {
    username: body.username,
    email: body.email,
    password: body.password,
    };
};




exports.updateUserData = (req, res) => {
    var newUsername = req.body.newUsername;
    var username = req.body.username;
    var email = req.body.email;
    var newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    var oldPassword = req.body.password;
    var token = req.body.token;

    if(newUsername.length == 0) newUsername = username;
    if(newPassword.length == 0) newPassword = password;
    if(newUsername.length == 0 && newPassword.length == 0 && email.length == 0) return res.send(false);
    let user;
    if(email.length != 0) {
        user = { 
            "username" : newUsername,
            "email" : email,
            "password" : newPassword
        };
    }
    else  {
        user = {
            "username" : newUsername,
            "password" : newPassword
        };
    }
    
    console.log(JSON.stringify(user));
    bcrypt.compare(token, oldPassword, (result, err) => {
        if (err) throw err;
        Users.updateOne(
            {"username" : username},
            user
        ).then((result, error) => {
            if (error) {
                console.log(error);
                return res.send(false);
            }
            if(result.n == 0)
            return res.send(false);
            return res.locals.redirect(`/${user.username}`)
        
    })
}) 
}


   

exports.authenticate=passport.authenticate("local", {
    failureRedirect: "/",
    failureFlash: "Failed to login.",
    successRedirect: "/:page",
    successFlash: "Logged in!"
  })
exports.logout=(req, res, next) => {
req.session.destroy()
req.logout()
res.redirect('/')
  }