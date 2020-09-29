const config = require('../../config');
const City = require('../models/city');
const Place = require('../models/place');
const User = require('../models/user');

// Afficher les informations d'un place
exports.show = async (req, res, next) => {
  try {
    const place = await Place.findOne({ _id: req.params.id },
      (err) => {
        if (err) {
          const errToThrow = new Error('Not found');
          errToThrow.statusCode = 404;
          throw errToThrow;
        }
      });
    const user = await User.findOne({ _id: config.localStorage.getItem('user') });
    res.status(200).render('place', { place, user });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const place = await (
      await Place.deleteOne({
        _id: req.params.id,
      }, (err) => {
        if (err) {
          const errToThrow = new Error('Not found');
          errToThrow.statusCode = 404;
          throw errToThrow;
        }
      })
    );
    const user = await User.findOne({ _id: config.localStorage.getItem('user') });
    if (!user) {
      return res.status(401).send('Not connected');
    }
    if (user.role !== 'Hote') {
      return res.status(403).send('Veuillez créer un compte hote');
    }
    return res.status(204).send(place);
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

// Pour afficher la vue de modification d'une location
exports.updateView = async (req, res, next) => {
  try {
    const place = await Place.findById({
      _id: req.params.id,
    });
    const citys = await City.find({});
    res.status(201).render('modificate', { place, citys });
  } catch (error) {
    next(error);
  }
};

// Pour mettre à jour les champs d'une location
exports.update = async (req, res, next) => {
  try {
    const place = await (
      await Place.updateOne({
        _id: req.params.id,
      }, {
        name: req.body.name,
        description: req.body.description,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        max_guests: req.body.max_guests,
        price_by_night: req.body.price_by_night,
      }, (err) => {
        if (err) {
          const errToThrow = new Error('An input field is missing');
          errToThrow.statusCode = 400;
          throw errToThrow;
        }
      })
    );
    if (!place) {
      return res.status(404).send('Aucune ressource trouvée');
    }
    const user = await User.findOne({ _id: config.localStorage.getItem('user') });
    if (!user) {
      return res.status(401).send('Not connected');
    }
    if (user.role !== 'Hote') {
      return res.status(403).send('Veuillez créer un compte hote');
    }
    return res.status(200).send(place);
  } catch (error) {
    next(error);
  }
};

// Afficher le formulaire d'ajout
exports.form = async (req, res, next) => {
  try {
    const places = await Place.find({
    });
    const citys = await City.find({});
    res.render('addplace', { places, citys });
  } catch (error) {
    next(error);
  }
};

// exports.store = async (req, res, next) => {
//   try {
//     let place = new Place();
//     place.name = req.body.name;
//     place = await place.save((error) => {
//       if (error) {
//         const err = new Error('An input field is missing');
//         err.statusCode = 400;
//         throw err;
//       }
//     });
//     res.send(place);
//   } catch (error) {
//     next(error);
//   }
// };

// Ajouter un nouveau place
exports.store = async (req, res, next) => {
  try {
    City.findById({ _id: req.params.city }, (err, data) => {
      if (err) return console.error(err);
      let place = new Place(req.body);
      User.findById({ _id: req.params.user }, (e, user) => {
        if (e) {
          const errToThrow = new Error('Not connected');
          errToThrow.statusCode = 401;
          throw errToThrow;
        }
        if (user.role === 'Hote') {
          const errToThrow = new Error('Mauvais rôle');
          errToThrow.statusCode = 403;
          throw errToThrow;
        }
        place = place.save(
          (error, newPlace) => {
            if (error) return console.error(error);
            data.places.push(newPlace);
            user.places.push(newPlace);
            data.save(
              (lastErr, pl) => {
                user.save();
                if (lastErr) return console.error(lastErr);
                res.status(201).json(pl);
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
