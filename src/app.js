const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('./infra/config/database')
const testRoutes = require('./main/routes/test')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json())

app.use('/test', testRoutes)

module.exports = app
