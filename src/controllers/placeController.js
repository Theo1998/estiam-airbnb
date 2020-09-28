const Place = require("../models/place");


// Afficher les informations d'un place
exports.show = async (req, res, next) => {
  try {
    const place = await Place.findOne({
      _id: req.params.id });
    res.render("place", {place: place});
  } catch (error) {
    next(error);
  }
};

// Afficher la liste de toutes les places
exports.all = async (req, res, next) => {
  try {
    const places = await Place.find({
    });
    res.render("places", { places: places });
  } catch (error) {
    next(error);
  }
};

// Afficher le formulaire d'ajout
exports.form = async (req, res, next) => {
  try {
    const places = await Place.find({
    });
    res.render("addplace", {places: places});
  } catch(error) {
    next(error);
  }
};

// Ajouter un nouveau place
exports.store = async (req, res, next) => {
  try {
    console.log(req.body)
    let place = new Place(req.body);
    place = await place.save();
    res.json(place);
  } catch (error) {
    next(error);
  }
};
