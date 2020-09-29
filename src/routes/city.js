const express = require('express');
const passportJWT = require('../middlewares/passportJWT')();

const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', passportJWT.authenticate(), cityController.index);
router.get('/:id', cityController.show);
router.post('/', cityController.store);

module.exports = router;
