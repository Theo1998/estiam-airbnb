const express = require('express');

const router = express.Router();

const passportJWT = require('../middlewares/passportJWT')();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/login', authController.loginView);
router.post('/signup', authController.signup);
router.get('/signup', authController.signupView);
router.get('/me', passportJWT.authenticate(), authController.me);

module.exports = router;
