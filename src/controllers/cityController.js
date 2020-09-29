const City = require('../models/city');

exports.index = async (req, res, next) => {
  try {
    const cities = await City.find({
      places: [],
    })
      .sort({ createAt: -1 });

    res.status(200).send(cities);
  } catch (error) {
    next(error);
  }
};
exports.show = async (req, res, next) => {
  try {
    const city = await (
      await City.findOne({
        _id: req.params.id,
      })
    );
    res.status(200).send(city);
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    let city = new City();
    city.name = req.body.name;
    city = await city.save();
    res.status(200).send(city);
  } catch (error) {
    next(error);
  }
};
