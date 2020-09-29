const express = require('express');

const passportJWT = require('../middlewares/passportJWT')();

const router = express.Router();
// gestion des images
const placeController = require('../controllers/placeController');

router.get('/delete/:id', placeController.delete);
router.post('/update/:id', placeController.update);
router.get('/update/:id', placeController.updateView);
router.get('/', passportJWT.authenticate(), placeController.all);
router.get('/new', placeController.form);
router.post('/new/:city/:user', placeController.store);
router.get('/:id', placeController.show);

module.exports = router;
