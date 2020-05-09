const Posts = require("../model/posts");

exports.getAllPostsPersonal = (req, res) => { 
    Posts.find({})
    .exec()
    .then((posts) => {
    res.render('personal', {
    newPost:posts,
page:'personal',

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

   exports.deletePost=(req,res)=>{
    const selectedPost=req.body.selected
    if (selectedPost.match(/^[0-9a-fA-F]{24}$/)) {
        Posts.findByIdAndDelete(selectedPost,(err) => {
            if (err) console.log(err)
            else { res.redirect('/personal') }})
      }
 }