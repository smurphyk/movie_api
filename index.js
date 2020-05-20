const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Array of top 10 movies
let topMovies = [];

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));

// GET requests

app.get('/', (req, res) => {
  res.send("Welcome to Murph's Movie API! If we don't have it, you don't need it!");
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
  console.log('All Ears on Port 8080!');
});
