const router = require("express").Router()

userController = require("../Controller/UserController")

router.get('/', userController.findAllUser)
router.post('/:username-:email-:password', userController.saveUser)
router.post('/:username-:password', userController.signIn)

module.exports = router;