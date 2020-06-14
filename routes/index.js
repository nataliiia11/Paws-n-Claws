const apiRoutes = require('./apiRoutes');
const router = require('express').Router(),
	userRoutes = require('./userRoutes'),
	postRoutes = require('./postRoutes'),
	errorRoutes = require('./errorRoutes'),
	homeRoutes = require('./index');
router.use('/api', apiRoutes);
router.use('/users', userRoutes);
router.use('/users/signin', userRoutes);
router.use('/users/signup', userRoutes);
router.use('/logout', userRoutes);
router.use('/update', userRoutes);
router.use('/users/:page/delete', postRoutes);
router.use('/users/:page', postRoutes);
router.use('/', homeRoutes);
router.use('/chat', homeRoutes);
router.use('/',errorRoutes);
module.exports = router;
