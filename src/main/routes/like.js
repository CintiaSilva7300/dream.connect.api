const LikeController = require('../controllers/like');

let app = require('express').Router();

const likeController = new LikeController();

app.post('/', function (req, res) {
    likeController.create(req, res);
});

app.get('/', function (req, res) {
    likeController.getAll(req, res);
});


module.exports = app;
