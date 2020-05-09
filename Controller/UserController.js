const Users = require("../model/user");
Users.init();
const fields = ['username', 'email', 'password']

//initialize database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PawsAndClaws", () => {
    Users.init();
}
)

exports.findAllUser = (req, res, next) => {
    Users.find({})
        .exec()
        .then((users) => {
            res.send(users)
        })
}

exports.saveUser = (req, res, next) => {
    let user = {
        'username' : req.params.username,
        'email'  : req.params.email,
        'password' : req.params.password}
    const newUser = new Users(user)
    newUser.save(newUser)
        .then(() => {
                res.send(newUser);
        })
}

exports.signIn = (req,res, next) => {
    let user = {
        'username' : req.params.username,
        'password' : req.params.password
    }

    Users.exists(user)
    .then(() => {
        res.send(true)
    })
}