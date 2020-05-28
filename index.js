const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movie_apiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid');

const bodyParser = require('body-parser'),
  app = express();

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// GET requests

app.get('/', (req, res) => {
  res.send("Welcome to Murph's Movie API! If we don't have it, you don't need it!");
});

// Gets the list of data for ALL top movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
  { return movie.title === req.params.title }));
});

// Gets data about director, by name
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
  { return director.name === req.params.name }));
});

// Gets list of all genres and descriptions
app.get('/genres', (req, res) => {
  res.json(genres);
});

// Gets data about genre, by name
app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
  //Make sure to test this
  { return genre.name === req.params.name }));
});

// Gets a list of all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a User
/* Expect Json in this format:
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
} */

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Allows user to upddate personal information
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  let newInfo = req.body

  if (user) {
    user.username[req.params.username] = parseInt(req.params.username);
    res.status(201).send('User ' + req.params.username + ' successfully updated their info!');
  } else {
    res.status(404).send('Amber Alert! User with the name ' + req.params.username + ' was not found!');
  }
});

// Allows user to add a movie to list of favorites
app.post('/users/:username/favorites', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });
  let newFav = req.body;

  if (user) {
    users.push(newFav);
    res.status(201).send('User ' + req.params.username + ' successfully added ' + newFav.title + ' to favorites!');
  };
});

// Allows user to remove a movie from list of favorites by title
app.delete('/users/:username/favorites/:title', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    let title = favorites.find((title) => { return favorites.title === req.params.title });
    res.status(201).send('User ' + req.params.username + ' successfully removed ' + req.params.title + ' from their favorites!');
  };
});

// Allows users to deregister
app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    res.status(201).send('User ' + req.params.username + ' has been successfully murdered!');
  };
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
  console.log('All Ears on Port 8080!');
});
