const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const userRoutes = require('./routes/userRoutes');
const config = require('./config/database');

const app = express();

//Connection to Database
mongoose.connect(config.database);
//On connected
mongoose.connection.on('connected', () => {
  console.log(`Connected to database : ${config.database}`);
});

//On connected
mongoose.connection.on('error', (err) => {
  console.log(`Error occurred while Database Connection : ${err}`);
});


//Port number
const port = 4000;

//Host static files
app.use(express.static(path.join(__dirname, 'public')));

//Cors Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser());

//Users routes
app.use('/users', userRoutes);

//Index route
app.get('/', function (req, res) {
  res.send(`Invalid Endpoint!`);
});

//Start server
app.listen(port, () => {
  console.log(`Server is running on port no: ${port}`);
});