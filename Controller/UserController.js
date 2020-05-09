<<<<<<< HEAD
const user = require("../model/user");

const fields = ["username", "email", "password"];


exports.findAll = (req,res) => {
    const requestParam = req.query;
    user.findAll({}, (error, result) => {
        if(error) throw error;
        if(result.length == 0) console.log("found nothing")
        else console.log(result)
    })
}

exports.findAny = (req, res) => {
    const requestParam = req.query;
    user.find({"username" : req.query.username}, (error, result) => {
        if(error) throw error;
        if(result.length > 0 && result.password == req.query.password) {
            res.redirect("/personal");
            console.log("Hi" + req.query.username);
        }

    });
    console.log(requestParam);
}
=======
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
>>>>>>> f8c9b010633e0876f2cea5a6ac3150bb0c522540
