require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const path = require('path');

// Port for the backend server and URI for mongodb atlas
const port = process.env.PORT;
const db = process.env.MONGODB;

const app = express();

// Enable all the CORS reqs
app.use(cors());

// Connect with MongoDB atlas
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .catch((err) => {
    console.log(err);
  });

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!')
});

// On error after initial connection
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

// Helmet Middleware for securing the HTTP headers
app.use(helmet());

// For parsing the incoming request bodies
app.use(bodyParser.json());

// Router variable
const router = require('./routes/router');
app.use('/uni', router);

// Static folder
app.use(express.static('client/build'));

// Sends the public/index.html as the response for any route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log('Server running on port: ' + port);
})