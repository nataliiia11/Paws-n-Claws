const router = require('express').Router(),
	userController = require('../Controller/userController');
router.get('/users', userController.index, userController.indexView);
router.get('/users/signin',userController.signin);
router.get('/users/signup',userController.signup);
router.post('/users/signup',userController.validate,userController.create,userController.redirectView);
router.post('/users/signin',userController.authenticate,userController.redirectView);
router.get('/logout',userController.logout);
router.put('/update', userController.updateUserData);
module.exports = router;
router.put('/:page',userController.updateUserData,userController.redirectView);
