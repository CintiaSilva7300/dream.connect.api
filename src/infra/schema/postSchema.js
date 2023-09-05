const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  code: { type: String, required: true },
  text: { type: String, required: false },
  userCode: { type: String, required: true },
  url_media: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
  status: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Post', Post);
