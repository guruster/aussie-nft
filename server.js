const express = require('express');
const path = require('path');
// const connectDB = require('./config/db');

require('dotenv').config();
const app = express();

////    MongoDB connect
// connectDB()
// Init Middleware
app.use(express.json());

// Define Routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/stripe', require('./routes/api/stripe'));

app.use('/', express.static(path.join(__dirname, 'images')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));
app.use('/', express.static(path.join(__dirname, 'images')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
