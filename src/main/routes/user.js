const UserController = require('../controllers/user');

let app = require('express').Router();

const userController = new UserController();

app.post('/', function (req, res) {
  userController.create(req, res);
});

app.post('/login', function (req, res) {
  userController.login(req, res);
});

app.get('/:code', function (req, res) {
  userController.getOneByCode(req, res);
});

app.get('/', function (req, res) {
  userController.getAll(req, res);
});

// app.delete('/:code', function (req, res) {
//   testController.deleteByCode(req, res);
// });

app.put('/:code', function (req, res) {
  userController.updateByCode(req, res);
});

module.exports = app;
