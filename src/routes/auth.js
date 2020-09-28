const express = require('express');

const router = express.Router();

const passportJWT = require('../middlewares/passportJWT')();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/me', passportJWT.authenticate(), authController.me);

module.exports = router;
