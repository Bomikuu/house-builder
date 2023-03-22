const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  foundationType: { type: String, required: true },
  size: { type: String, required: true },
  floorCount: { type: Number, required: true },
  roomSpecs: { type: Object, required: true },
});

module.exports = mongoose.model('House', HouseSchema);