'use strict';
const Users = require('../model/User');

const bcrypt = require("bcrypt");
//In order to be able to authenticate user login data with passport, we also need to add this
//package inside the controller. Auth action from passport is called authenticate.
const passport = require('passport');
const httpStatus = require('http-status-codes');

//initialize database
const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', () => {
	Users.init();
});
module.exports={
	index: (req, res, next) => {
		Users.find()
			.then(users => {
				res.locals.users = users;
				next();
			})
			.catch(error => {
				console.log(`Error fetching users: ${error.message}`);
				next(error);
			});
	},
	indexView: (req, res) => {
		//	res.render('users/index2');
		if (req.query.format === 'json'){    
			res.json(res.locals.users);  
		} else {    
			res.render('index');  
		} 	
	},
	findAllUser : (req, res) => {
		Users.find()
			.exec()
			.then((users) => {
				return res.send(users);
			});
	},

	redirectView:(req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath) res.redirect(redirectPath);
		else next();

	},


	findUser: (req,res,next) => {
		Users.findOne({'email' : req.body.email})
			.then((result) => {
				if (result) req.found = true;
				else req.found = false;
				next();
			}); 
	},

	signIn: (req,res,next) => {

	},

	updateUserData: (req, res, next) => {
		let username = req.params.page,
			newData = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		
			};
		Users.findOneAndUpdate(username, {
			$set: newData
		})
			.then(user => {
			res.locals.redirect = `/users/${username}`;
			res.locals.user = user;
			req.flash("success", "user profile updated");
			next();
			})
			.catch(error => {
			console.log(`Error updating user by ID: ${error.message}`);
			req.flash("error", "user profile not updated");
			next(error);
			});
	},
	
	logout:(req, res, next) => {
		req.session.destroy();
		req.logout();

		res.redirect('/');
	},

	signin:(req, res) => {
		res.render('users/signin');
	},

	signup:(req, res) => {
		res.render('users/signup');
	},


	respondJSON:(req, res) => {  
		res.json({    
			status: httpStatus.OK,
			data: res.locals
		});
	},
	errorJSON: (error, req, res, next) => {
		let errorObject;
		if (error) {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: error.message
			};
		} else {
			errorObject = {
				status: httpStatus.INTERNAL_SERVER_ERROR,
				message: 'Unknown Error.'
			};
		}
		res.json(errorObject);
	},

	//New implementation of the controller
	getUserWithUsernameWithParam : (req,res,next) => {
		Users.find({username : req.params.username}, (err, findResult) => {
			if (err) throw err;
			req.foundUser = findResult;
			next();
		});
	},
	
	createNewUserAccount : (req,res,next) => {
		//password field can be removed since passport is now responsible for it
		let newUser = new Users({
			username : req.body.username,
			email : req.body.email
		});

		/*
			Now instead of using newUser.save(), we can use User(database's table name).register which method comes from passport.js
			newUser.save()
			.then(() => {
				console.log("new user is added to the database");
			})
			.catch(() => {
				console.log("error adding new user");
			});
		*/
		//Register the user
		Users.register(newUser, req.body.password, (error, user) => {
			if(user) {
				req.flash("registered", "account created");
			} else {
				req.flash("errorRegister", error.message);
			}
			res.render("index");
		})
	},

	// Check more : http://www.passportjs.org/docs/authenticate/
	// In order for passport.authenticate() to work inside a function,
	// adding (req,res,next); ath the end of authenticate() is needed.
	// passport.authenticate()(req,res,next);
	auth : function(req,res,next) {
		passport.authenticate('local', (errors, user, info) => {
			if(errors) throw errors;
			if(user) {
				req.user = user;
				next();
			} else {
				req.flash("notAuthed", info.message)
				res.json({loggedIn : false});
			}
		})(req,res,next);
	},

	//Middle ware of what happens after the user is authenticated and logged in
	afterAuth : (req,res,next) => {
		if(req.user) {
			req.session.loggedIn = true;
			req.session.currentUser = req.user;
			res.json(
				{
					loggedIn : req.session.loggedIn, 
					user : req.session.currentUser
				}
			);
		}
	},

	//Pass the route to postController if user logged in
	passToPostController : (req,res,next) => {
		if(req.session.currentUser)
			next();
		else {
			req.flash("notLoggedIn", "Please log in!");
			res.render("index");
		}
	},
	//Gives user detail to the client
	getUserDetail : (req,res,next) => {
		const user = req.session.currentUser;
		Users.findOne({
			username : user.username
		}, (error, savedDocument) => {
			res.json(savedDocument);
		});
	}
};