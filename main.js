
const port = 3000;
const express=require('express');
const ejs= require('ejs')
const path = require('path');
const bodyParser = require('body-parser')
const app= new express();
homeController = require("./Controller/homeController"),
errorController = require("./Controller/errorController"),
app.use("/public", express.static(path.join(__dirname,"public")));
app.get('/', (req,res) => {
    res.render("index");
})
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const posts=[];
// app.get('/:page',(req,res)=>{
//     const definedPage=req.params.page
//     res.render(definedPage,{newPost:posts,page:definedPage});
// })

app.get("/personal", homeController.showPosts);

app.post('/personal',(req,res)=>{
post=req.body.newPost;
posts.push(post);
res.render('personal',{newPost:posts,page:"personal"});

}
)

app.post('/newsfeed',(req,res)=>{
    post=req.body.newPost;
    posts.push(post);
    res.render('newsfeed',{newPost:posts,page:"newsfeed"});
    
    }
    )

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