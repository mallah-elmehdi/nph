// --- SET UP
const express = require('express');
const router = express.Router();

// --- HANDLER
const handler = require('../handler/index');
const authHandler = require('../handler/auth');
const errorHandler = require('../handler/error');

// landing page
router
	.route('/')
	.get(
		handler.landingPage,
		errorHandler.throwError
	);

// sign in
router
	.route('/sign-in')
	.get(authHandler.signProtector, handler.signIn, errorHandler.throwError)
	.post(
		authHandler.signProtector,
		authHandler.authentication,
		authHandler.cookie,
		errorHandler.throwError
	);
	
// redirection
router
	.route('/article')
	.get(handler.redirection, errorHandler.throwError);

// article
router
	.route('/article/:article')
	.get(handler.article, errorHandler.throwError);

// sign out
router.route('/sign-out').get(authHandler.signOut, errorHandler.throwError);

module.exports = router;
