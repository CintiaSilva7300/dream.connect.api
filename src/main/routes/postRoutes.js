const PostController = require('../controllers/post');
const isAuthenticated = require('../middlewares/isAuthenticated');

let app = require('express').Router();

const postController = new PostController();

app.post('/', async function (req, res) {
  postController.create(req, res);
});

app.get('/getLikedPostByUserCode',isAuthenticated, async function (req, res) {
  postController.getLikedPostByUserCode(req, res);
});

app.get('/:code', function (req, res) {
  postController.getOneByCode(req, res);
});

app.get('/', function (req, res) {
  postController.getAll(req, res);
});

// app.delete('/:code', function (req, res) {
//   testController.deleteByCode(req, res)
// })

app.put('/:code', function (req, res) {
  postController.updateByCode(req, res);
});

module.exports = app;
