const CommentController = require('../controllers/comment');

let app = require('express').Router();

const commentController = new CommentController();

app.post('/', function (req, res) {
  commentController.create(req, res);
});

app.get('/:code', function (req, res) {
  commentController.getOneByCode(req, res);
});

app.get('/', function (req, res) {
  commentController.getAll(req, res);
});


module.exports = app;
