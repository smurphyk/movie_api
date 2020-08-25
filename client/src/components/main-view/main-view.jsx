import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
import MoviesList from '../movies-list/movies-list.jsx';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(!user)
    window.open('/client', '_self');
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
    if (!movies) return <Container className="main-view" fluid="true" />

    return (
      <Router basename="/client">
        <Container className="main__view" fluid="true">
          <Navbar expand="lg" className="navbar">
            <Navbar.Brand as={Link} to="/" className="navbar__brand">
              <p className="navbar__brand-text">Murph's Movies API</p>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic__navbar-nav" />
            <Navbar.Collapse id="basic__navbar-nav">
              <Nav className="nav">
                <div className="nav__link-container">
                  <Nav.Link as={Link} to="/" className="nav__link">
                    <p className="nav__link-label">Home</p>
                  </Nav.Link>
                  <Nav.Link as={Link} to={`/users/${user}`} className="nav__link">
                    <p className="nav__link-label">Profile</p>
                  </Nav.Link>
                  <div className="logout__button-container">
                    <Button className="logout__button" size="sm" onClick={() => this.onLoggedOut()}>
                      <b>Log Out</b>
                    </Button>
                  </div>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br></br>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;
          }} />
          <Route exact path="/register" render={() => <RegistrationView />} />
          <Route exact path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route exact path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <Container className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />
          <Route exact path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <Container className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route exact path="/users/:username" render={() => {
            if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            if (movies.length === 0) return <Container className="main-view" />;
            return <ProfileView movies={movies} />
          }} />
        </Container>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

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
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
      }),
      ImagePath: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired
    })
  ),
  user: PropTypes.string.isRequired
};