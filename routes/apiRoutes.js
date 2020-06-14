const router = require('express').Router(),
	userController = require('../Controller/UserController');
router.get('/users', userController.index, 
	userController.respondJSON);
router.use(userController.errorJSON);
module.exports = router;
