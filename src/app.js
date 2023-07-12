const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./infra/config/database');
const testRoutes = require('./main/routes/test');
const postRoutes = require('./main/routes/postRoutes');
const userRoutes = require('./main/routes/user');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/test', testRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);

module.exports = app;
