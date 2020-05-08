const Users = require("../model/user");

exports.getAllUsers = (req, res) => { 
    Users.find({})
    .exec()
    .then((users) => {
    res.render("users", {
    users: users
    });
    })
    .catch((error) => {
    console.log(error.message);
    return [];
    })
    .then(() => {
    console.log("promise complete");
    });
   };
   exports.SignInPage = (req, res) => { 
    res.render("/");
   };
   exports.saveUser = (req, res) => { 
    let newUser = new User( {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    });
    newUser.save()
    .then( () => {
    res.redirect('/personal');
    })
    .catch(error => {
    res.send(error);
    });
   };