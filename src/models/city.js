const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema({
  name: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, ref: 'place' }],
  createdAt: { type: Date, default: Date.now() },
});

const City = mongoose.model('City', CitySchema);

module.exports = City;
