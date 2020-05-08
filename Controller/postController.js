const Posts = require("../model/posts");

exports.getAllPostsPersonal = (req, res) => { 
    Posts.find({})
    .exec()
    .then((posts) => {
    res.render('personal', {
    newPost:posts,
page:'personal'
    });
    })
    .catch((error) => {
    console.log(error.message);
    return [];
    })
    .then(() => {
    Posts.deleteMany({});
    });
   };
   
   exports.getAllPostsNewsfeed = (req, res) => { 
    Posts.find({})
    .exec()
    .then((posts) => {
    res.render('newsfeed', {
    newPost:posts,
page:'newsfeed'
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
   
   exports.savePost = (req, res) => { 
    let newPost = new Posts( {
    content: req.body.newPost,
    
    });
    newPost.save()
    .then( () => {
    res.redirect('/personal');
    })
    .catch(error => {
    res.send(error);
    });
   };