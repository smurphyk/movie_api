import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  getUser(token) {

    axios.get('https://murphmovies.herokuapp.com/users', {
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getUser(accessToken);
    }
  }

  render() {
    const { user } = this.state;
    const { movies } = this.props;

    return (
      <Container className="profile-view">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text>Username: {user.Username}</Card.Text>
            <Card.Text>Password: *****</Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthday: {user.Birthday}</Card.Text>
            <Card.Text>Favorite Movies: {user.FavoriteMovies}</Card.Text>
            <Link to={'/user/update'}>
              <Button className="update-button">Update Profile</Button>
            </Link>
            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}