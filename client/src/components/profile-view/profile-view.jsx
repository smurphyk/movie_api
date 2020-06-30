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
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    console.log(accessToken)
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
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

  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios({
      method: 'delete',
      url: `https://murphmovies.herokuapp.com/users/${username}/Movies/${movie}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(`${movie.Title} was removed from Favorites`);
        window.open('_self');
      }).catch(function (err) {
        console.log(err)
      })
  }

  handleDeregister(e, user) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'delete',
      url: `https://murphmovies.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log(`${username} was deleted`);
        alert('Profile Successfully Deleted');
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Error deregistering User')
      });
  };

  render() {
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;
    const { movies } = this.props;

    return (
      <Container className="profile-view">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text className="profile-item">Username:</Card.Text>{Username}
            <span className="update">
              <input
                placeholder="Update Username">
              </input>
            </span>
            <Card.Text className="profile-item">Password:</Card.Text>*****
            <span className="update">
              <input
                placeholder="Update Password">
              </input>
            </span>
            <Card.Text className="profile-item">Email:</Card.Text>{Email}
            <span className="update">
              <input
                placeholder="Update Email">
              </input>
            </span>
            <Card.Text className="profile-item">Birthday:</Card.Text>{Birthday}
            <span className="update">
              <input
                placeholder="Update Birthday">
              </input>
            </span>
            {FavoriteMovies.length === 0 && <div>You have no favorite movies.</div>}
            <Card.Text className="profile-item">Favorite Movies:</Card.Text>
            <div className="favs-container">
              <ul className="favs-list">
                {FavoriteMovies.length > 0 &&
                  movies.map(movie => {
                    if (movie._id === FavoriteMovies.find(favMovie => favMovie === movie._id)) {
                      return <li className="favorites-item" key={movie._id}>{movie.Title}
                        <Button size="sm" className="remove-favorite" onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>Remove</Button>
                      </li>
                    }
                  })
                }
              </ul>
            </div>
            <div className="button-container">
              <Button className="update-button" block>Update Profile</Button>
              <Link to={`/`}>
                <Button className="back-button" block>Back</Button>
              </Link>
              <Button className="delete-user" block onClick={(e) => this.handleDeregister(e)}>Delete Profile</Button>
            </div>
          </Card.Body>
        </Card >
      </Container >
    );
  }
}