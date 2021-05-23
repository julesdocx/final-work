require('dotenv').config();
const googleConfig = require('../googleAppCredentials.json')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const apiRoutes = require('./lib/routes/api');
const authRoutes = require('./lib/routes/auth');

const app = express();

const morgan = require('morgan');
app.use(morgan('tiny'));

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

let server = http.Server(app);
server.listen(process.env.PORT, () => console.log(`API is running on localhost: ${process.env.PORT}`));

server.on('error', (error) => {
  console.log('httpServer error', error);
});

const admin = require('firebase-admin');

var bcrypt = require('bcrypt');
const saltRounds = 10;
