const mongoose = require('mongoose');

const specificationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Buffer, required: false }
});

module.exports = mongoose.model('Specification', specificationsSchema);