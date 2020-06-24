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
      user: {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        FavoriteMovies: [],
        movies: [],
      }
    };
  }

  getUser(token) {
    let username = localStorage.getItem('user');

    axios.get(`https://murphmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
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
    const { movies } = this.props;

    return (
      <Container className="profile-view">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text>Username: {this.state.Username} </Card.Text>
            <Card.Text>Password: ***** </Card.Text>
            <Card.Text>Email: {this.state.Email}</Card.Text>
            <Card.Text>Birthday: {this.state.Birthday}</Card.Text>
            <Card.Text>Favorite Movies:</Card.Text>
            <div className="favorites-container">
              <ul className="favorites-list">
                <li className="favorites-item">
                  {this.state.FavoriteMovies}
                </li>
              </ul>
            </div>
            <Link to={'/users/update'}>
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