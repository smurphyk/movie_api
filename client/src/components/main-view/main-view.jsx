import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import Container from 'react-bootstrap/Container';
import {
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';

import MoviesList from '../movies-list/movies-list.jsx';
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

    this.state = {
      user: null
    };
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

  onLoggedIn(authData) {
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

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router basename="/client">
        <Container className="main-view" fluid="true">
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
            return <ProfileView movies={movies} />
          }} />
        </Container>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);