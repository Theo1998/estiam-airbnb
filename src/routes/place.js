const express = require("express");
const router = express.Router();
const Place = require("../models/place");
// gestion des images
const placeController = require("../controllers/placeController");

router.get("/", placeController.all);
router.get("/new", placeController.form);
router.post("/new", placeController.store);
router.get("/:id", placeController.show);

module.exports = router;
