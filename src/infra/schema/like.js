const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Like = new Schema({
  code: { type: String, required: true },
  like: { type: Boolean, required: true },
  postCode: { type: String, require: true },
  userCode: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', Like);
