import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get('https://murphmovies.herokuapp.com/users/${username}', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.props;
    //const favoriteMovieList = movies.filter((movie) =>
    //this.state.favoriteMovies.includes(movie._id)
    // );

    return (
      <Container className="profile-container">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text>Username: {user.Username}</Card.Text>
            <Card.Text>Password: *****</Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthday {user.Birthday}</Card.Text>
            Favorite Movies: {
              favoriteMovieList.map((movie) => {
                <div key={movie._id} className="favorites-button">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">{movie.Title}</Button>
                  </Link>
                  <Button size="md" onClick={(e) => this.deleteFavorite(movie._id)}>
                    Remove From Favorites
                  </Button>
                </div>
              })}
            }
            <Link to={'/user/update'}>
              <Button>Update Profile</Button>
            </Link>
            <Link to={`/`}>Back</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}