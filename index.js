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
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    genre: 'Drama',
    director: 'David Fincher',
    image: 'img/fight_club.png',
    featured: 'Yes'
  },
  {
    id: 2,
    title: 'Rubber',
    description: 'A homicidal car tire, discovering it has destructive psionic power, sets its sights on a desert town once a mysterious woman becomes its obsession.',
    genre: 'Comedy, Fantasy, Horror',
    director: 'Quentin Dupieux',
    image: 'img/rubber.png',
    featured: 'No'
  },
  {
    id: 3,
    title: 'The Sunset Limited',
    description: 'Through a chance encounter, two men of opposing ideologies deliberate spiritual, philosophical, and profound matters in a New York City apartment.',
    genre: 'Drama',
    director: 'Tommy Lee Jones',
    image: 'img/sunset_limited.png',
    featured: 'No'
  },
  {
    id: 4,
    title: 'John Wick',
    description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.',
    genre: 'Action, Crime, Thriller',
    director: 'Chad Stahelski',
    image: 'img/john_wick.png',
    featured: 'Yes'
  },
  {
    id: 5,
    title: 'Ex Machina',
    description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
    genre: 'Drama, Mystery, Sci-Fi, Thriller',
    director: 'Alex Garland',
    image: 'img/ex_machina.png',
    featured: 'Yes'
  },
];

let directors = [
  {
    name: 'David Fincher',
      bio: 'https://www.imdb.com/name/nm0000399/',
      born: 'August 28, 1962',
      died: 'N/A',
  },
  {
    name: 'Quentin Dupieux',
      bio: 'https://www.imdb.com/name/nm1189197/?ref_=fn_al_nm_1',
      born: 'April 14, 1974',
      died: 'N/A',
  },
  {
    name: 'Tommy Lee Jones',
      bio: 'https://www.imdb.com/name/nm0000169/?ref_=fn_al_nm_1',
      born: 'September 15, 1946',
      died: 'N/A',
  },
  {
    name: 'Chad Stahelski',
      bio: 'https://www.imdb.com/name/nm0821432/?ref_=fn_al_nm_1',
      born: 'September 20, 1968',
      died: 'N/A',
  },
  {
    name: 'Alex Garland',
      bio: 'https://www.imdb.com/name/nm0307497/?ref_=fn_al_nm_1',
      born: 'May 26, 1970',
      died: 'N/A',
  },
];

// Array of Genres with descriptions

let genres = [
  {
    name: 'Action',
    description: 'Action movies are defined by risk and stakes. To be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.',
  },
  {
    name: 'Drama',
    description: 'Dramas are defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.',
  },
  {
    name: 'Mystery',
    description: 'Mystery movies can often be connected to the crime genre, but may not involve or use law enforcement or the justice system as the main mains characters or backdrop for the story. A mystery story is defined by the plot, and both the character’s and the viewer’s relationship with the motivations and reality behind the events that occur.',
  },
  {
    name: 'Sci-Fi',
    description: 'Sci-Fi movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science.',
  },
  {
    name: 'Thriller',
    description: 'Thrillers are mostly about the emotional purpose, which is to elicit strong emotions, mostly dealing with generating suspense and anxiety.',
  },
  {
    name: 'Crime',
    description: 'Crime movies deal with both sides of the criminal justice system but do not focus on legislative matters or civil suits and legal actions.',
  },
  {
    name: 'Comedy',
    description: 'Comedy movies are defined by events that are intended to make someone laugh, no matter if the story is macabre, droll, or zany.',
  },
  {
    name: 'Fantasy',
    description: 'Fantasy movies are defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws.',
  },
  {
    name: 'Horror',
    description: 'Horror movies are centered upon depicting terrifying or macabre events for the sake of entertainment.',
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
  res.json(users);
});

// Allows new user to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if(!newUser.name) {
    const message = 'Missing "name" in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something made an Uh-Oh!');
});

//listen for requests
app.listen(8080, () => {
  console.log('All Ears on Port 8080!');
});
