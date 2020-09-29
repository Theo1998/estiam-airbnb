const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  max_guests: { type: Number, required: true },
  price_by_night: { type: Number, required: true },
  city: { type: Schema.Types.ObjectId, ref: 'city' },
  host: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now() },
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
