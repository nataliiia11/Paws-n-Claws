'use strict';
const router = require('express').Router();
const bodyParser = require('body-parser');
const apiRoutes = require();
router.use(bodyParser.json());
router.use('/api', apiRoutes);

const userController = require('../Controller/UserController');
const postController = require('../Controller/postController');
const homeController =require('../Controller/homeController');

router.get('/', userController.findAllUser);
router.post('/signup/',userController.validate,userController.create);
router.post('/user/signin/',userController.authenticate,postController.getAllPostsPersonal);
router.get('/logout',userController.logout);
router.put('/update', userController.updateUserData);
router.get('/chat', homeController.chat);
//router.get('/:page',userController.validate,postController.getAllPostsPersonal,userController.authenticate)


module.exports = router;