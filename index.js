const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid');

const bodyParser = require('body-parser'),
  app = express();

// Middleware
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

// In-memory array of movies
let movies = [
  {
    id: 1,
    title: 'Fight Club',
    description: {
      plot: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
      genre: 'Drama',
    },
    director: {
      name: 'David Fincher',
      bio: '', //Link to bio
      born: 'August 28, 1962',
      died: 'N/A',
    },
    image: 'img/fight_club.png',
    featured: 'Yes'
  },
  {
    id: 2,
    title: 'Rubber',
    description: {
      plot: 'A homicidal car tire, discovering it has destructive psionic power, sets its sights on a desert town once a mysterious woman becomes its obsession.',
      genre: 'Comedy, Fantasy, Horror',
    },
    director: {
      name:'Quentin Dupieux',
      bio: '',
      born: 'April 14, 1974',
      died: 'N/A',
    },
    image: 'img/rubber.png',
    featured: 'No'
  },
  {
    id: 3,
    title: 'The Sunset Limited',
    description: {
      plot: 'Through a chance encounter, two men of opposing ideologies deliberate spiritual, philosophical, and profound matters in a New York City apartment.',
      genre: 'Drama',
    },
    director: {
      name: 'Tommy Lee Jones',
      bio: '',
      born: 'September 15, 1946',
      died: 'N/A',
    },
    image: 'img/sunset_limited.png',
    featured: 'No'
  },
  {
    id: 4,
    title: 'John Wick',
    description: {
      plot: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
      genre: 'Action, Crime, Thriller',
    },
    director: {
      name: 'Chad Stahelski, David Leitch (uncredited)',
      bio: '',
      born: 'September 20, 1968',
      died: 'N/A',
    },
    image: 'img/john_wick.png',
    featured: 'Yes'
  },
  {
    id: 5,
    title: 'Ex Machina',
    description: {
      plot: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
      genre: 'Drama, Mystery, Sci-Fi, Thriller',
    },
    director: {
      name: 'Alex Garland',
      bio: '',
      born: 'May 26, 1970',
      died: 'N/A',
    },
    image: 'img/ex_machina.png',
    featured: 'Yes'
  },
];

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

// Gets data about description, by title
app.get('/movies/:title/:description', (req, res) => {
  res.json(topMovies.find((movie) =>
  //Make sure to test this
  { return movie.description === req.params.description }));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
  console.log('All Ears on Port 8080!');
});
