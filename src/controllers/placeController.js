const City = require('../models/city');
const Place = require('../models/place');
const User = require('../models/user');

// Afficher les informations d'un place
exports.show = async (req, res, next) => {
  try {
    const place = await Place.findOne({ _id: req.params.id });
    res.render('place', { place });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const place = await (
      await Place.deleteOne({
        _id: req.params.id,
      })
    );
    res.send(place);
  } catch (error) {
    next(error);
  }
};

// Afficher la liste de toutes les places
exports.all = async (req, res, next) => {
  try {
    const places = await Place.find({
    });
    res.render('places', { places });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const place = await (
      await Place.updateOne({
        _id: req.params.id,
      }, {
        name: req.body.name,
      })
    );
    res.send(place);
  } catch (error) {
    next(error);
  }
};

// Afficher le formulaire d'ajout
exports.form = async (req, res, next) => {
  try {
    const places = await Place.find({
    });
    res.render('addplace', { places });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    let place = new Place();
    place.name = req.body.name;
    place = await place.save();
    res.send(place);
  } catch (error) {
    next(error);
  }
};

// Ajouter un nouveau place
exports.store = async (req, res, next) => {
  try {
    City.findById({ _id: req.params.city }, (err, data) => {
      if (err) return console.error(err);
      let place = new Place(req.body);
      User.findById({ _id: req.params.user }, (e, user) => {
        if (e) return console.error(e);
        if (user.role === 'Hote') return console.error('Mauvais rôle');
        place = place.save(
          (error, newPlace) => {
            if (error) return console.error(error);
            data.places.push(newPlace);
            user.places.push(newPlace);
            data.save(
              (lastErr, pl) => {
                user.save();
                if (lastErr) return console.error(lastErr);
                res.json(pl);
                return true;
              },
            );
            return true;
          },
        );
        return true;
      });
      return true;
    });
  } catch (error) {
    next(error);
  }
};
