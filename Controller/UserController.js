"use strict";
const Users = require("../model/User");
const bcrypt = require("bcrypt");
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

exports.signIn = (req,res) => {
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
        })
    }) 
}
exports.getUserParams= (body) => { 
    return {
    name: {
    first: body.first,
    last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
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
            return res.send(true);
        })
        
    })
    
}