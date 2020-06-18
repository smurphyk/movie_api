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
        FavoriteMovies: []
      }
    };
  }

  getUser(token) {
    let username = localStorage.getItem('user');

    axios.get(`https://murphmovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        console.log(response.data);

        this.setState({
          user: {
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
          }
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
    const { users } = this.props;
    const { user } = this.state;

    return (
      <Container className="profile-view">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text>Username: {user.Username} </Card.Text>
            <Card.Text>Password: {user.Password} </Card.Text>
            <Card.Text>Email: {user.Email}</Card.Text>
            <Card.Text>Birthday: {user.Birthday}</Card.Text>
            <Card.Text>Favorite Movies: </Card.Text>
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