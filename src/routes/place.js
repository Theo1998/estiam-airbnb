const express = require('express');

const router = express.Router();
const placeController = require('../controllers/placeController');

router.get('/', placeController.index);
router.get('/delete/:id', placeController.delete);
router.post('/update/:id', placeController.update);
router.post('/', placeController.store);

module.exports = router;
