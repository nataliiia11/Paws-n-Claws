const router = require('express').Router(),
	postController = require('../Controller/postController');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

// router.post('/users/:page',postController.savePost);
router.post('/upload', upload.single('photo'), (req, res) => {
	if(req.file) {
		res.json(req.file);
	}
	else throw 'error';
});
	
//post controller router
router.post('/post/delete',postController.deletePost);
router.get('/posts',postController.getAllPostsPersonal);
router.post('/post/new', postController.postNewPost);
router.get('/newsfeed', postController.getAllPostsNewsfeed);

module.exports = router;