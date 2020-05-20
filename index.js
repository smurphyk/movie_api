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
let topMovies = [
  {
    id: 1,
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    genre: 'Drama',
    director: 'David Fincher',
    image URL: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    featured: 'Yes'
  },
  {
    id: 2,
    title: 'Rubber',
    description: 'A homicidal car tire, discovering it has destructive psionic power, sets its sights on a desert town once a mysterious woman becomes its obsession.',
    genre: 'Comedy, Fantasy, Horror',
    director: 'Quentin Dupieux',
    image URL: 'https://m.media-amazon.com/images/M/MV5BYzUyZjg4YzktZmVlMy00MGQ2LThiZTEtNmUwZWQwOTUzMWYzXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SY1000_CR0,0,706,1000_AL_.jpg',
    featured: 'No'
  },
  {
    id: 3,
    title: 'The Sunset Limited',
    description: 'Through a chance encounter, two men of opposing ideologies deliberate spiritual, philosophical, and profound matters in a New York City apartment.',
    genre: 'Drama',
    director: 'Tommy Lee Jones',
    image URL: 'https://m.media-amazon.com/images/M/MV5BMTM3MjUyMTY1MV5BMl5BanBnXkFtZTcwNzE0MDQ0NA@@._V1_SY1000_CR0,0,678,1000_AL_.jpg',
    featured: 'No'
  },
  {
    id: 4,
    title: 'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    genre: 'Action, Crime, Thriller',
    director: 'Chad Stahelski, David Leitch (uncredited)',
    image URL: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
    featured: 'Yes'
  },
  {
    id: 5,
    title: 'Ex Machina',
    description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
    genre: 'Drama, Mystery, Sci-Fi, Thriller',
    director: 'Alex Garland',
    image URL: 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
    featured: 'Yes'
  },
];

// GET requests

app.get('/', (req, res) => {
  res.send("Welcome to Murph's Movie API! If we don't have it, you don't need it!");
});

// Gets the list of data for ALL top movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Gets data about a single movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(topMovies.find((movie) =>
  { return movie.title === req.params.title }));
});

// Gets data about description and genre, by title
app.get('/movies/:description', (req, res) => {
  // Make description an object containing plot and genre 5/20 
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
  console.log('All Ears on Port 8080!');
});
