const Posts = require('../model/Posts');
const fields = ['content', 'signInName',];

exports.getAllPostsPersonal = (req, res) => { 
	Posts.find({signInUser:req.session.currentUser.username})
		.then((posts) => {
			res.render('personal', {
				newPost:posts,
				username : req.session.currentUser.username
			});
		});
};
   
exports.getAllPostsNewsfeed = (req, res) => { 
	Posts.find({})
		.then((posts) => {
			res.render('newsfeed', {
				newPost : posts, 
				username : req.session.currentUser.username
			});
		})
		.catch((error) => {
			console.log(error.message);
			return [];
		});
};
   
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

exports.deletePost=(req,res)=>{
	const selectedPost=req.body.id;
	Posts.find({_id : "5ef8432055fb44421c7569f0"}, (error, foundDocument) => {
		if (error) console.log(error);
		console.log(foundDocument);
	})
	
};

exports.getPostsParams=(body)=> {
	const o = {};
	fields.forEach(f => {
		if (body[f]) {
			o[f] = body[f];
		}
	});
	return o;
};