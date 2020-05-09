const router = require("express").Router()
const bodyParser = require("body-parser");

router.use(bodyParser.json())

userController = require("../Controller/UserController")

router.get('/', userController.findAllUser)
router.post('/signup/', userController.saveUser)
router.post('/signin/', userController.signIn)

module.exports = router;