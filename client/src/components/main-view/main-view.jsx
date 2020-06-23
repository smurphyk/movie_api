import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);

    // Initialize the state to an empty object so we can destructrue it later
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://murphmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  render() {

    // Before data is initially loaded
    const { user, movies } = this.state;
    const username = localStorage.getItem('user');

    // Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <Navbar expand="lg">
          <Navbar.Brand as={Link} to="/">Murph's Movie API</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to={`/users/${username}`}>Profile</Nav.Link>
              <Button size="sm" onClick={() => this.onLoggedOut()}>
                <b>Log Out</b>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br></br>
        <Container className="main-view">
          <Route exact path="/" render={() => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />);
          }} />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies) return <Container className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />
          <Route exact path="/directors/:name" render={({ match }) => {
            if (!movies) return <Container className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route exact path="/users/:username" render={({ match }) => {
            return <ProfileView />
          }} />
        </Container>
      </Router >
    );
  }
}