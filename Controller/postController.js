const Posts = require("../model/Posts");
const fields = ['content', 'signInName',]
exports.getAllPostsPersonal = (req, res) => { 
    const userPage=req.params.page;
    Posts.find({signInUser:userPage})
    .exec()
    .then((posts) => {
    res.render('personal', {
    newPost:posts,
    page:userPage,
    userName:userPage

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
    page:'newsfeed',

    userName:'test'
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
    const userPage=req.params.page;
    let newPost = new Posts( {
    content: req.body.newPost,
    signInUser: userPage
    });
    newPost.save()
    .then( () => {
    res.redirect('/'+userPage);
    })
    .catch(error => {
    res.send(error);
    });
   };

   exports.deletePost=(req,res)=>{
    const selectedPost=req.body.selected
    const userPage=req.params.page
    if (selectedPost.match(/^[0-9a-fA-F]{24}$/)) {
        Posts.findByIdAndDelete(selectedPost,(err) => {
            if (err) console.log(err)
            else { res.redirect('/'+userPage) }})
      }
 }

 exports.getPostsParams=(body)=> {
    const o = {}
    fields.forEach(f => {
      if (body[f]) {
        o[f] = body[f]
      }
    })
    return o
  }