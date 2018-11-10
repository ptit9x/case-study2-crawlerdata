
const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  desciption: String,
  content: String,
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', linkSchema);