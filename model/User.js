/* eslint-disable no-unused-vars */
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
/*
In order for passport to work, we need to add passport-local-mongoose to User model.
This also tells that userSchema is going to use passportLocalMongoose for password hashing and storage.
*/
const passportLocalMongoose=require('passport-local-mongoose');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	username : {
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	email : {
		type : String,
		unique : true,
		required : true,
		trim : true,
		uniqueCaseInsensitive : true
	}
});

//with passportLocalMongoose added, we need to tell userSchema that username field is going to be used as login parameter.
//By adding this, passport.js will also takes care of password storage, which means, password field can be deleted from userSchema.
//The reason is because this plugin modifies the schema from behind the scene to add hash and salt to userModel instead of normal password field.
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

//---------------------------------------BCRYPT-------------------------------------------//

/*
	With adding passport to the project, this method is not required anymore and needed to be deleted,
	the reason is because this method will try to hash the password before passport can do it.
	userSchema.pre('save', function(next) { 
		let user = this;
		bcrypt.hash(user.password, 10).then(hash => { 
			user.password = hash;
			next();
		})
			.catch(error => {
				console.log(`Error in hashing password: ${error.message}`);
				next(error);
			});
	});
*/

userSchema.methods.passwordComparison = (inputPassword) =>{ 
	let user = this;
	return bcrypt.compare(inputPassword, user.password);
};
//----------------------------------------------------------------------------------------//

// userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);