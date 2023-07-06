const VideoController = require('../controllers/video');

let app = require('express').Router();

const videoController = new VideoController();

app.post('/', function (req, res) {
  videoController.create(req, res);
});

// app.get('/:code', function (req, res) {
//   testController.getOneByCode(req, res)
// })

app.get('/', function (req, res) {
  videoController.getAll(req, res);
});

// app.delete('/:code', function (req, res) {
//   testController.deleteByCode(req, res)
// })

app.put('/:code', function (req, res) {
  videoController.updateByCode(req, res);
});

module.exports = app;
