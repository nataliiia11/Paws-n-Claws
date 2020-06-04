"use strict";
const router = require("express").Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

const userController = require("../Controller/UserController");
const homeController =require('../Controller/homeController');

router.get('/', userController.findAllUser);
router.post('/signup/', userController.saveUser);
router.post('/signin/', userController.signIn);
router.put('/update', userController.updateUserData);
router.get("/chat", homeController.chat);

module.exports = router;