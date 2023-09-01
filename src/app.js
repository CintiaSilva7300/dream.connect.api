const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./infra/config/database');
const postRoutes = require('./main/routes/postRoutes');
const userRoutes = require('./main/routes/user');
const comment = require('./main/routes/comment');
const file = require('./main/routes/file');
const like = require('./main/routes/like');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/post', postRoutes);
app.use('/user', userRoutes);
app.use('/comment', comment);
app.use('/file', file);
app.use('/like', like);

module.exports = app;
