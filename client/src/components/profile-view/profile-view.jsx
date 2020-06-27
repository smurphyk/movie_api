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
      // movies: [],
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
  render() {
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;
    const { movies } = this.props;

    return (
      <Container className="profile-view">
        <h1>My Profile</h1>
        <Card className="profile-card">
          <Card.Body>
            <Card.Text className="profile-item">Username:</Card.Text>{Username}
            <Card.Text className="profile-item">Password:</Card.Text>*****
            <Card.Text className="profile-item">Email:</Card.Text>{Email}
            <Card.Text className="profile-item">Birthday:</Card.Text>{Birthday}
            {FavoriteMovies.length === 0 && <div>You have no favorite movies.</div>}
            <Card.Text className="profile-item">Favorite Movies:</Card.Text>
            <div className="favs-container">
              <ul className="favs-list">
                {FavoriteMovies.length > 0 &&
                  movies.map(movie => {
                    if (movie._id === FavoriteMovies.find(favMovie => favMovie === movie._id)) {
                      return <li className="favorites-item" key={movie._id}>{movie.Title}
                        <Button size="sm" className="remove-favorite">Remove</Button>
                      </li>
                    }
                  })
                }
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