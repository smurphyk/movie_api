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

// Gets data for all movies
app.get('/movies', (req, res) => {
  Movies.find().then(movies => res.json(movies));
});

// Gets data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  }
);


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

// Update user info, by Username
/* Expect Json in this format:
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
} */

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.statuse(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Allows user to add a movie to list of favorites

app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  {new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allows user to remove a movie from list of favorites by title
app.delete('/users/:username/favorites/:title', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    let title = favorites.find((title) => { return favorites.title === req.params.title });
    res.status(201).send('User ' + req.params.username + ' successfully removed ' + req.params.title + ' from their favorites!');
  };
});

// Delete a user by username

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted. ');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
console.log('All Ears on Port 8080!');
});
