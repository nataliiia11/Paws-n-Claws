
const port = 3000;

const express=require('express');
const ejs= require('ejs')
const path = require('path');
const bodyParser = require('body-parser')
const app= new express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
postController = require("./Controller/postController"),
errorController = require("./Controller/errorController"),

app.use("/public", express.static(path.join(__dirname,"public")));
app.use('/user', userRouter)

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const posts=[];
app.get("/personal",postController.getAllPostsPersonal);
app.get('/newsfeed',postController.getAllPostsNewsfeed);
// app.get('/:page',(req,res)=>{
//     const definedPage=req.params.page

//     res.render(definedPage,{newPost:posts,page:definedPage});
// })
app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/personal/delete',postController.deletePost)


//old post to personal
// app.post('/personal',(req,res)=>{
// post=req.body.newPost;
// posts.push(post);
// res.render('personal',{newPost:posts,page:"personal"});

// }
//)
app.post('/personal',postController.savePost)

// app.post('/newsfeed',(req,res)=>{
//     post=req.body.newPost;
//     posts.push(post);
//     res.render('newsfeed',{newPost:posts,page:"newsfeed"});
    
//     }
//     )
    app.post('/upload', upload.single('photo'), (req, res) => {
        if(req.file) {
            res.json(req.file);
        }
            else throw 'error'
    });

   
      
app.listen(3000,()=>
console.log("Listening on Port 3000"))


//mongoose implementation
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/PawsAndClaws', {useNewUrlParser: true, useUnifiedTopology: true});
var database = mongoose.connection;
database.on("error", console.error.bind(console, 'Connection error'));
database.once("open", () => {
    console.log("Connection to database Paws And Claws succesfull.")
})
