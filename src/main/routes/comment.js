const CommentController = require('../controllers/comment');

let app = require('express').Router();

const commentController = new CommentController();

app.post('/', function (req, res) {
  commentController.create(req, res);
});

// app.post('/login', function (req, res) {
//   userController.login(req, res);
// });

app.get('/:code', function (req, res) {
  commentController.getOneByCode(req, res);
});

app.get('/', function (req, res) {
  commentController.getAll(req, res);
});

// app.delete('/:code', function (req, res) {
//   testController.deleteByCode(req, res);
// });

// app.put('/:code', function (req, res) {
//   userController.updateByCode(req, res);
// });

module.exports = app;
