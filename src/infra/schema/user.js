const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  secondName: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: Number, required: false },
  genre: { type: String, required: true },
  birthDate: { type: Date, required: false },
  password: { type: String, required: false },
  confirmPassword: { type: String, required: false },
  registerDate: { type: Date, default: Date.now },
  status: { type: Boolean, required: true, default: true },
  typeLogin: { type: String, required: false, default: 'email' },
});

module.exports = mongoose.model('User', User);