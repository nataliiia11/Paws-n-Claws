/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';
const Users = require('../model/User');
const Posts = require('../model/Posts');
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const passport = require('passport');
const httpStatus = require('http-status-codes');
const { body, check, validationResult } = require('express-validator');
const token = process.env.TOKEN ||"meowtheworld"
const getUserParams= body => { 
	return {
		username: body.username,
		email: body.email,
		password: body.password,
	};
};
//initialize database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-hanh:hanh@cluster1-yhbkr.mongodb.net/PawsAndClaws', () => {
	Users.init();
}
);
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

	saveUser : (req, res) => {
		var password = '';
		if(req.body.password != '') password = bcrypt.hashSync(req.body.password, 10);
		console.log(req.body.password);
		let user = {
			'username' : req.body.username,
			'email'  : req.body.email,
			'password' : password};

		const newUser = new Users(user);

		newUser.save(newUser, (err, result) => {
			if (err) {
				return res.send(false);
			}
			return res.send(true);
		});
	},




	create:(req, res, next) => {
		let userParams = getUserParams(req.body);
		console.log(userParams);
		Users.create(userParams)
			.then(user => {
				req.flash('success', `${user.username}'s account created
   successfully!`); 
				res.locals.redirect = `/users/${user.username}`;
				res.locals.user = user;
				next();
			})
			.catch(error => {
				console.log(`Error saving user: ${error.message}`);
				res.locals.redirect = '/users/signup';
				req.flash(
					'error',
					`Failed to create user account because: ${error.message}.` 
				);
				next();
			});
	},

	redirectView:(req, res, next) => {
		let redirectPath = res.locals.redirect;
		if (redirectPath !== undefined) res.redirect(303, redirectPath)
		else next();

	},
	verifyToken: (req, res, next) => { 
		if (req.query.apiToken === token) next(); 
		else next(new Error("Invalid API token.")); 
	   },


	signIn: (req,res,next) => {
		const userPage=req.params.page;
		res.type('application/json');
		Users.findOne({'email' : req.body.email})
			.then((result) => {
				if(result == null) return res.send(JSON.stringify({'result' : false}));
				const dbPassword = result.password;
				bcrypt.compare(req.body.password, dbPassword, (err, result) => {
					if (err) throw err;
					result = JSON.stringify(
						{
							'result' : true,
							'token' : dbPassword
						}
					);
					console.log(result);
					return res.redirect(`/${result.username}`);
            
				});
				next();
			}); 
	},


   

 

	validate:(req, res, next) => {
		req
			.sanitizeBody('email')
			.normalizeEmail({
				all_lowercase: true
			})
			.trim();
		req.check('email', 'Email is invalid').isEmail();
		req.check('password', 'Password cannot be empty').notEmpty();

		req.getValidationResult().then(error => {
			if (!error.isEmpty()) {
				let messages = error.array().map(e => e.msg);
				req.skip = true;
				req.flash('error', messages.join(' and '));
				res.locals.redirect = '/users/signup';
				next();
			} else {
				next();
			}
		});
	},
	authenticate: (req, res, next) => {
		Users.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					user.passwordComparison(req.body.password).then(passwordsMatch => {
						if (passwordsMatch) {
							res.locals.redirect = `/users/${user.username}`;
							req.flash('success', `${user.username}'s logged in successfully!`);
							res.locals.user = user;
							
						} else {
							req.flash('error', 'Failed to log in user account: Incorrect Password.');
							res.locals.redirect = '/users/signin';
							console.log('false pass');
						}
						next();
					});
				} else {
					req.flash('error', 'Failed to log in user account: User account not found.');
					res.locals.redirect = '/';
					console.log('not found');
					next();
				}
			})
			.catch(error => {
				console.log(`Error logging in user: ${error.message}`);
				next(error);
			});
	},
	delete: (req, res, next) => {
		const userId = req.params.id
		Users.findByIdAndRemove(userId)
		  .then(() => {
			res.locals.redirect = '/users'
			next()
		  })
		  .catch(error => {
			console.log(`Error deleting user by ID: ${error.message}`)
			next()
		  })
	  },

	//   show: (req, res, next) => {
	//     let userId = req.params.id;
	//     Users.findById(userId)
	//       .then(user => {
	//         res.locals.user = user;
	//         next();
	//       })
	//       .catch(error => {
	//         console.log(`Error fetching user by ID: ${error.message}`);
	//         next(error);
	//       });
	// },
	// showView:(req, res) => {
	//     res.render("users/show");
	//   },
	
	  update: (req, res, next) => {
		let userId = req.params.id,
		  userParams = {
			username: username,
			email: req.body.email,
			password: req.body.password,
		
		  };
		Users.findOneAndUpdate(username, {
		  $set: userParams
		})
		  .then(user => {
			res.locals.redirect = `/users/${userId}`;
			res.locals.user = user;
			next();
		  })
		  .catch(error => {
			console.log(`Error updating user by ID: ${error.message}`);
			next(error);
		  });
	  },
	  updateUsername: (req, res, next) => {
		const userId = req.params.id
		const userParams = getUserParams(req.body)
	
		Users.findByIdAndUpdate(userId , userParams)
		  .then(user => {
			res.locals.redirect = `/users/${userParams.username}`
			res.locals.user = user
			next()
		  })
		  .catch(error => {
			console.log('could not save user: ' + error.message)
			req.flash('error', `Error updating user by ID: ${error.message}`)
			res.locals.redirect = `/`
			next()
		  })
	  },
	updateUserData :(req, res) => {
		var newUsername = req.body.newUsername;
		var username = req.body.username;
		var email = req.body.email;
		var newPassword = bcrypt.hashSync(req.body.newPassword, 10);
		var oldPassword = req.body.password;
		var token = req.body.token;

		if(newUsername.length == 0) newUsername = username;
		if(newPassword.length == 0) newPassword = password;
		if(newUsername.length == 0 && newPassword.length == 0 && email.length == 0) return res.send(false);
		let user;
		if(email.length != 0) {
			user = { 
				'username' : newUsername,
				'email' : email,
				'password' : newPassword
			};
		}
		else  {
			user = {
				'username' : newUsername,
				'password' : newPassword
			};
		}
    
		console.log(JSON.stringify(user));
		bcrypt.compare(token, oldPassword, (result, err) => {
			if (err) throw err;
			Users.updateOne(
				{'username' : username},
				user
			).then((result, error) => {
				if (error) {
					console.log(error);
					return res.send(false);
				}
				if(result.n == 0)
					return res.send(false);
				return res.locals.redirect(`/users/${user.username}`);
        
			});
		}); 
	},


   

   

	// authenticate:passport.authenticate("local", {
	//     failureRedirect: "/",
	//     failureFlash: "Failed to login.",
	//     successRedirect: "/",
	//     successFlash: "Logged in!"
	//   }),
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

};