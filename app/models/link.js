
const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  url: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: false },
  domain: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Link', linkSchema);