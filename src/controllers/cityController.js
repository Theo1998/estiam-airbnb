const City = require('../models/city');

exports.index = async (req, res, next) => {
  try {
    const citys = await City.find()
      .sort({ createAt: -1 });

    res.send(citys);
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
    res.send(city);
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    let city = new City();
    city.name = req.body.name;
    city = await city.save();
    res.send(city);
  } catch (error) {
    next(error);
  }
};
