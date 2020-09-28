const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  rooms: { type: Number },
  bathrooms: { type: Number },
  max_guests: { type: Number },
  price_by_night: { type: Number },
  city: { type: Schema.Types.ObjectId, ref: 'city' },
  host: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now() },
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
