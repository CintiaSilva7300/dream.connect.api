const FileController = require('../controllers/file');
const GridFsStorage = require('../../infra/config/gridFsStorageService');

let app = require('express').Router();

const fileController = new FileController();

app.post('/upload', GridFsStorage, function (req, res) {
  return res.status(200).json({ teste: req.file });
});

app.get('/:id', GridFsStorage, function (req, res) {
  fileController.getFile(req, res);
});

module.exports = app;
