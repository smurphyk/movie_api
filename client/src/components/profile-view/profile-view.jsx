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
    const { movies } = this.props;

    return (
      <Container className="profile-container">
        <h1>{this.state.Username}'s Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text>Username: {this.state.Username}</Card.Text>
            <Card.Text>Password: *****</Card.Text>
            <Card.Text>Email: {this.state.Email}</Card.Text>
            <Card.Text>Birthday {this.state.Birthday}</Card.Text>
            <Card.Text>Favorite Movies:</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}