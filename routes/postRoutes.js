const router = require('express').Router(),
	postController = require('../Controller/postController');
router.post('/users/:page/delete', postController.deletePost);
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

router.post('/users/:page',postController.savePost);
router.post('/upload', upload.single('photo'), (req, res) => {
	if(req.file) {
		res.json(req.file);
	}
	else throw 'error';
});
    