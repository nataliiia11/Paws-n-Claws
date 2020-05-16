const Users = require("../model/User");
const bcrypt = require("bcrypt");
const fields = ['username', 'email', 'password']

//initialize database
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', () => {
    Users.init();
}
)

exports.findAllUser = (req, res, next) => {
    Users.find()
        .exec()
        .then((users) => {
           return res.send(users)
        })
}

exports.saveUser = (req, res, next) => {
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

exports.signIn = (req,res, next) => {
    const userPage=req.params.page;
    res.type("application/json")
    Users.findOne({"username" : req.body.username})
    .then((result) => {
        if(result == null) return res.send(false);
        bcrypt.compare(req.body.password, result.password, (err, result) => {
            if (err) throw err;
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
   }