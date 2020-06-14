const router = require('express').Router(),
	homeController = require('../Controller/homeController');

router.get('/',homeController.index);
router.get('/chat', homeController.chat);
