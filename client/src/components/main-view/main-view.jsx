import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { setMovies, setUser, setButton } from '../../actions/actions';

import Container from 'react-bootstrap/Container';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list.jsx';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user')
    if (accessToken !== null) {
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(user) {
    localStorage.clear();
    window.open('/client', '_self');
    this.props.setUser(user);
  }

  viewButtons(view) {
    this.props.setButton(view);
  }

  getMovies(token) {
    axios.get('https://murphmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    let { movies, user } = this.props;
    let username = localStorage.getItem('user');

    if (!movies) return <Container className="main-view" fluid="true" />;

    return (
      <Router basename="/client">
        <Container className="main-view" fluid="true">
          <Navbar expand="lg">
            <Navbar.Brand as={Link} to="/">Murph's Movie API</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="main-nav">
                <Nav.Link className="nav-link" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="nav-link" as={Link} to={`/users/${username}`}>Profile</Nav.Link>
                <br></br>
                <Button size="md" className="logout-button" onClick={() => this.onLoggedOut()}>
                  <b>Log Out</b>
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br></br>
          <Route exact path="/" render={() => {
            if (!user)
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
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
          <Route exact path="/users/:username" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            if (movies.length === 0) return <Container className="main-view" />;
            return <ProfileView movies={movies} onLoggedOut={user => this.onLoggedOut(!user)} />
          }} />
        </Container>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user, button: state.button }
}

export default connect(mapStateToProps, { setMovies, setUser, setButton })(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    })
  ),
  user: PropTypes.string.isRequired
};