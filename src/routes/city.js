const express = require('express');

const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.index);
router.get('/:id', cityController.show);
router.post('/', cityController.store);

module.exports = router;
