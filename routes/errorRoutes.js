const router = require('express').Router(),
	errorController = require('../Controller/errorController');


router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);