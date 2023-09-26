const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  genre: { type: String, required: false },
  image: { type: String, required: false },
  birthDate: { type: Date, required: false },
  password: { type: String, required: false },
  secondName: { type: String, required: false },
  telephone: { type: Number, required: false },
  registerDate: { type: Date, default: Date.now },
  confirmPassword: { type: String, required: false },
  status: { type: Boolean, required: true, default: true },
  typeLogin: { type: String, required: false, default: 'email' },
});

module.exports = mongoose.model('User', User);
