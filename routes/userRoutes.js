"use strict";

const router = require("express").Router(),
    userController = require("../Controller/UserController"),
    postcontroller = require("../Controller/postController");
    
router.get("/all", userController.findAllUser);
router.get("/:username", userController.getUserWithUsernameWithParam);
router.post("/register", userController.createNewUserAccount);
router.post("/login", userController.auth, userController.afterAuth);
router.get('/logout',userController.logout);
router.get("/personal/data", userController.getUserDetail);
router.get("/personal", userController.passToPostController, postcontroller.getAllPostsPersonal);
    
module.exports = router;