const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  code: { type: String, required: true },
  text: { type: String, required: false },
  // value: { type: Number, required: true },
  // date: { type: Date, required: true },
  // type: { type: String, required: false, default: 'Entreternimento' },
  url_media: { type: String, required: false },
  status: { type: Boolean, required: true, default: true },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', Post);
