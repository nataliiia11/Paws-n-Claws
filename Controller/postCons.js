"use strict";

const Posts = require("../model/Posts");

exports.getAllPostsPersonal = (req,res,next) => {
    const user= req.session.currentUser;
	console.log(user);
	Posts.find({signInUser:user.username})
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
			console.log('promise complete');
		});
}

exports.postNewPost = (req,res,next) => {
    const newPost = new Posts({
        content : req.body.content,
        signInUser : req.session.currentUser.username
    });

    newPost.save((error, savedDocument) => {
        if (error) throw error;
        res.end();
    })
}