const TestController = require('../controllers/test')

let app = require('express').Router()

const testController = new TestController()

app.post('/', function (req, res) {
  testController.create(req, res)
})

app.get('/:code', function (req, res) {
  testController.getOneByCode(req, res)
})

app.get('/', function (req, res) {
  testController.getAll(req, res)
})

app.delete('/:code', function (req, res) {
  testController.deleteByCode(req, res)
})

module.exports = app
