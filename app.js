'use strict'
const express=require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app= new express();
const multer = require('multer');
const layouts= require('express-ejs-layouts')
const upload = multer({dest: __dirname + '/uploads/images'});
const userRouter = require('./Router/userRouter');
const postController = require('./Controller/postController');
const errorController = require('./Controller/errorController');
const userController = require('./Controller/UserController');
const homeController=require('./Controller/homeController');
  

app.use('/public', express.static(path.join(__dirname,'public')));
app.use(
  express.urlencoded({
    extended: false
  }))
app.use(morgan(':method:url:status*:response-time ms'))
app.use('/user', userRouter);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
//app.use(layouts);

require('dotenv').config();
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 3001 : 3000)
app.set('port', port)

//const posts=[];
app.get('/chat',homeController.chat)
app.get('/newsfeed',postController.getAllPostsNewsfeed);
app.get('/:page',postController.getAllPostsPersonal);
//res.redirect('/personal/'+definedPage,{newPost:posts,page:'personal'});
app.get('/personal',postController.getAllPostsPersonal);


app.get('/',(req,res)=>{
	res.render('index');
});




app.post('/:page/delete',postController.deletePost);



app.post('/:page',postController.savePost);
app.post('/upload', upload.single('photo'), (req, res) => {
	if(req.file) {
		res.json(req.file);
	}
	else throw 'error';
});
app.put('/:page',userController.updateUserData,userController.redirectView)
//app.post('/users/:id', userController.delete)

module.exports = app