'use strict';
const express=require('express');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const bodyParser = require('body-parser');
const router=express.Router();
const morgan = require('morgan');
const passport = require('passport'); 
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app= new express();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const expressSession = require('express-session');
const expressValidator = require( 'express-validator'); 
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const postController = require('./Controller/postController');
const errorController = require('./Controller/errorController');
const userController = require('./Controller/UserController');
const homeController=require('./Controller/homeController');
var User = require('./model/User');


app.use('/public', express.static(path.join(__dirname,'public')));
app.use(
	express.urlencoded({
		extended: false
	}));
app.use(morgan(':method:url:status*:response-time ms'));


app.set('view engine','ejs');
router.use(express.static('public'));
router.use(layouts);
router.use(express.urlencoded({extended:false}));
router.use(
	methodOverride('_method', {
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	  methods: ['POST', 'GET']
	})
);



router.use(express.json());

router.use(cookieParser('secret_passcode')); 
router.use(expressSession({
	secret: 'secret_passcode',
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
})); 


 
 
router.use(passport.initialize()); 
router.use(passport.session()); 
passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());





router.use(flash());
router.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flashMessages = req.flash();
	next();
});
router.use(expressValidator());

require('dotenv').config();
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 3001 : 3000);
app.set('port', port);

//const posts=[];

router.get('/chat', homeController.chat);
router.get('/newsfeed', postController.getAllPostsNewsfeed);
//app.get('/:page',userController.authenticate,postController.getAllPostsPersonal);
//res.redirect('/personal/'+definedPage,{newPost:posts,page:'personal'});
//router.get('/personal',postController.getAllPostsPersonal);


// router.get('/',(req,res)=>{
// 	res.render('index');
// });
router.get('/api', userController.index);
router.get('/',homeController.index);
router.get('/users', userController.index, userController.indexView);
router.get('/users/signin',userController.signin);
router.get('/users/signup',userController.signup);
router.post('/users/signup',userController.validate,userController.create,userController.redirectView);
router.post('/users/signin',userController.authenticate,userController.redirectView);
router.get('/logout',userController.logout);
router.put('/update', userController.updateUserData);
router.get('/chat', homeController.chat);
router.get('/users/:page',postController.getAllPostsPersonal);

router.post('/users/:page/delete',postController.deletePost);



router.post('/users/:page',postController.savePost);
router.post('/upload', upload.single('photo'), (req, res) => {
	if(req.file) {
		res.json(req.file);
	}
	else throw 'error';
});
router.put('/:page',userController.updateUserData,userController.redirectView);
//app.post('/users/:id', userController.delete)
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);
app.use('/', router);

module.exports = app;