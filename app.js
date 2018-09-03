//Node Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
var logger = require('morgan');

//Custom Modules
const userRoutes = require('./routes/userRoutes');
const config = require('./config/database');

//Initialize express app
const app = express();

//Connect to Database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

//On successfully connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database : ${config.database}`);
});

//On connection failure
mongoose.connection.on('error', (err) => {
  console.log(`Error occurred while Database Connection : ${err}`);
});


//Port number
const port = 4000;

//Enable logging using morgan
app.use(logger('dev'));

//Host static files
app.use(express.static(path.join(__dirname, 'public')));

//Cors Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Initialise passport
require('./config/passport')(passport);

//Users routes
app.use('/users', userRoutes);

//Index route (Home Page)
app.get('/', function (req, res) {
  res.send(`Invalid Endpoint!`);
});

//Start express server on specified port
app.listen(port, () => {
  console.log(`Server is running on port no: ${port}`);
});