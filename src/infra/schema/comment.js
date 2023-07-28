const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
  code: { type: String, required: true },
  text: { type: String, required: false },
  userCode: { type: String, required: true },
  url_media: { type: String, required: false },
  registerDate: { type: Date, default: Date.now },
  postCode: { type: String, require: false },
});

module.exports = mongoose.model('Comment', Comment);
