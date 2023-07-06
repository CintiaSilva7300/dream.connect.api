const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: false, default: 'Entreternimento' },
  status: { type: Boolean, required: true, default: false },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', Video);
