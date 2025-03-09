// Comic.js
const mongoose = require('mongoose');

const comicSchema = mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  document: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Comic', comicSchema);