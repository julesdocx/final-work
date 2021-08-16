require('dotenv').config();
const googleConfig = require('../googleAppCredentials.json')
const {Storage} = require('@google-cloud/storage');
//const projectId = googleConfig.project_id;
//const storage = new Storage({projectId, googleConfig});

//listBuckets();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const apiRoutes = require('./lib/routes/api');
const authRoutes = require('./lib/routes/auth');

// // Makes an authenticated API request.
// async function listBuckets() {
//   try {
//     const [buckets] = await storage.getBuckets();
//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
// }

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