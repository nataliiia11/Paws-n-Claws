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