const Place = require('../models/place');

exports.index = async (req, res, next) => {
  try {
    const places = await Place.find()
      .sort({ createAt: -1 });

    res.send(places);
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
