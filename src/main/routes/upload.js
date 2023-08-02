const UploadController = require('../controllers/upload');
const GridFsStorage = require('../../infra/config/gridFsStorageService');

let app = require('express').Router();
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}`;

const uploadController = new UploadController();
// const uploadService = new UploadService(url);

app.post('/', GridFsStorage, function (req, res) {
  console.log(req.file);
  return res.status(200).json({ teste: req.file });
  // uploadController.create(req, res);""
});

module.exports = app;
