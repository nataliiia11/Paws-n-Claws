'use strict'
const express=require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router=express.Router();
const morgan = require('morgan')
const passport = require("passport"); 
const app= new express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const expressSession = require("express-session");
const expressValidator = require( "express-validator") 
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const userRouter = require('./Router/userRouter');
const postController = require('./Controller/postController');
const errorController = require('./Controller/errorController');
const userController = require('./Controller/UserController');
const homeController=require('./Controller/homeController');
var User = require("./model/User");


app.use('/public', express.static(path.join(__dirname,'public')));
app.use(
  express.urlencoded({
    extended: false
  }))
app.use(morgan(':method:url:status*:response-time ms'))


app.set('view engine','ejs');

userRouter.use(bodyParser.urlencoded({extended:true}));

userRouter.use(express.static('public'));

//app.use(layouts);
userRouter.use(express.json());

userRouter.use(cookieParser("secret_passcode")); 
userRouter.use(expressSession({
 secret: "secret_passcode",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
})); 


 
 
userRouter.use(passport.initialize()); 
userRouter.use(passport.session()); 
passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());




userRouter.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flashMessages = req.flash();
	next();
  });
  userRouter.use(flash());
  userRouter.use(expressValidator())

require('dotenv').config();
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 3001 : 3000)
app.set('port', port)

//const posts=[];
app.get('/chat',homeController.chat)
app.get('/newsfeed',postController.getAllPostsNewsfeed);
//app.get('/:page',postController.getAllPostsPersonal);
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

//app.use('/',userRouter)

module.exports = app