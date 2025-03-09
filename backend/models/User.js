// User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['author', 'reader'], required: true },
});

module.exports = mongoose.model('User', userSchema);