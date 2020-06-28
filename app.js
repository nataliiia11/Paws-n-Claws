'use strict';
const express=require('express');
// eslint-disable-next-line no-unused-vars
const app= new express();
const router=express.Router();
const morgan = require('morgan');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const expressValidator = require( 'express-validator'); 
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const errorController = require('./Controller/errorController');
const passport = require('passport'); 
const User = require("./model/User");

const path = require("path");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

app.use(
	express.urlencoded({
		extended: false
	}));
app.use(morgan(':method:url:status*:response-time ms'));


app.set('view engine','ejs');
app.use(layouts);
app.use(
	methodOverride('_method', {
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	  methods: ['POST', 'GET']
	})
);



app.use(express.json());

app.use(cookieParser('secret_passcode')); 
app.use(expressSession({
	secret: 'secret_passcode',
	cookie: {
		maxAge: 4000000
	},
	resave: false,
	saveUninitialized: false
})); 


//Initialize passport to the router
app.use(passport.initialize());
//This is to tell passport to use any session set up to the project. Session must be defined before this line.
app.use(passport.session());

//This configures the login strategy of the user.
passport.use(User.createStrategy());
//Serialize data from user model.
passport.serializeUser(User.serializeUser());
//Deserialize data from user model.
passport.deserializeUser(User.deserializeUser());
/*
In order for passport to work, we need to add passport-local-mongoose to User model.
*/


app.use(flash());
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flashMessages = req.flash();
	next();
});
router.use(expressValidator());

require('dotenv').config();
const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 3001 : 3000);
app.set('port', port);


//-------------------------------FROM HERE IS ROUTER----------------------------------//
const userRouter = require("./routes/userRoutes");
const userRoutes = require("./routes/userRoutes");
const homeRouter = require("./routes/homeRoutes");
const postRouter = require("./routes/postRoutes");

//------------------------------FROM HERE USE ROUTER----------------------------------//
app.use("/user", userRouter);
app.use("/", homeRouter);
app.use("/", postRouter);






//app.post('/users/:id', userController.delete)
router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use('/', router);

module.exports = app;