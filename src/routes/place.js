const express = require('express');

const router = express.Router();
// gestion des images
const placeController = require('../controllers/placeController');

router.get('/delete/:id', placeController.delete);
router.post('/update/:id', placeController.update);
router.get('/', placeController.all);
router.get('/new', placeController.form);
router.post('/new/:city/:user', placeController.store);
router.get('/:id', placeController.show);

module.exports = router;
