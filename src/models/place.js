const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  // user_id: { type: Number },
  //city_id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  rooms: { type: Number },
  bathrooms: { type: Number },
  max_guests: { type: Number },
  price_by_night: { type: Number },
  //available: { type: Array},
  //comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  createdAt: { type: Date, default: Date.now() },
});

const Place = mongoose.model('Place', PlaceSchema)
module.exports = Place;