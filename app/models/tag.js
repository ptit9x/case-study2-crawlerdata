
const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Tag', tagSchema);