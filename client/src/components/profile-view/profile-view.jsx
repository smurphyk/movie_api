import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './profile-view.scss';
import {
  Tabs,
  Tab,
  Form,
} from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.Username = null,
      this.Password = null,
      this.Email = null,
      this.Birthday = null

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
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
        alert(`Successfully removed from Favorites`);
        window.open('_self');
      }).catch(function (err) {
        console.log(err)
      })
  }

  handleUpdate(e, newUsername, newEmail, newBirthday) {
    this.setState({
      validated: null
    })

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      })
      return;
    }
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'put',
      url: `https://murphmovies.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: this.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        })
        localStorage.setItem('user', this.state.Username);
        window.open(`/client/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeregister(e) {
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
        alert('Profile Successfully Deleted');
        window.open('/client', '_self');
      })
      .catch((e) => {
        console.log('Error deregistering User')
      });
  }

  render() {
    const { Username, Email, Birthday, FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Container className="profile__view">
        <Tabs defaultActiveKey="profile" transition={false} className="profile__tabs">
          <Tab className="tab__item" eventKey="profile" title="Profile">
            <Card className="profile__card">
              <h1 className="profile__title">{Username}'s Profile</h1>
              <Card.Body>
                <Card.Text className="profile__item">Username:</Card.Text>{Username}
                <Card.Text className="profile__item">Password:</Card.Text>*****
            <Card.Text className="profile__item">Email:</Card.Text>{Email}
                <Card.Text className="profile__item">Birthday:</Card.Text>{Birthday}
                <Card.Text className="profile__item">Favorite Movies:</Card.Text>
                {FavoriteMovies.length === 0 && <div>You have no favorite movies.</div>}
                <div className="favorites__container">
                  <ul className="favorites__list">
                    {FavoriteMovies.length > 0 &&
                      movies.map(movie => {
                        if (movie._id === FavoriteMovies.find(favMovie => favMovie === movie._id)) {
                          return <li className="favorites__item" key={movie._id}>{movie.Title}
                            <Button size="sm" className="remove__favorite" onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>Remove</Button>
                          </li>
                        }
                      })
                    }
                  </ul>
                </div>
                <div className="button__container">
                  <Link to={`/`}>
                    <Button className="back__button" block>Back</Button>
                  </Link>
                  <Button className="delete__user" block onClick={(e) => this.handleDeregister(e)}>Delete Profile</Button>
                </div>
              </Card.Body>
            </Card >
          </Tab>
          <Tab className="tab__item" eventKey="update" title="Update">
            <Card className="update__card">
              <h1 className="profile__title">Update Profile</h1>
              <Card.Body>
                <Form noValidate validated={validated} className="update__form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label className="form__label">Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Change Username"
                      defaultValue={Username}
                      onChange={e => this.setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="form__label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      defaultValue=""
                      onChange={e => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form__label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Change Email"
                      defaultValue={Email}
                      onChange={e => this.setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      A password is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicBirthday">
                    <Form.Label className="form__label">Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Change Birthday"
                      defaultValue={Birthday}
                      onChange={e => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="update" type="submit" size="sm">Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container >
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
}