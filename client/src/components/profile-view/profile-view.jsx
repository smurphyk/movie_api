import React from 'react';
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
      userInfo: null,
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
    let user = localStorage.getItem('user');
    axios.get(`https://murphmovies.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          userInfo: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const user = localStorage.getItem('user');
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

  handleUpdate(e, username, password, email, birthday, userInfo) {
    const form = e.currentTarget;
    e.preventDefault();

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'put',
      url: `https://murphmovies.herokuapp.com/users/${user}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: username ? username : userInfo.username,
        Password: password ? password : userInfo.password,
        Email: email ? email : userInfo.email,
        Birthday: birthday ? birthday : userInfo.birthday
      },
    })
      .then(() => {
        alert('Saved Changes');
        window.open(`/users/${user}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  setBirthday(input) {
    this.birthday = input;
  }

  handleDeregister(e, user) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios({
      method: 'delete',
      url: `https://murphmovies.herokuapp.com/users/${user}`,
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
  }

  render() {
    const { userInfo } = this.state;
    const { movies } = this.props;

    return (
      <Container className="profile-view" fluid="true">
        <Tabs defaultActiveKey="profile" className="profile-tabs">
          <Tab eventKey="profile" title="Profile">
            <h1>My Profile</h1>
            <Card className="profile-card">
              <Card.Body>
                <Card.Text className="profile-item">Username:</Card.Text>{Username}
                <Card.Text className="profile-item">Password:</Card.Text>*****
            <Card.Text className="profile-item">Email:</Card.Text>{Email}
                <Card.Text className="profile-item">Birthday:</Card.Text>{Birthday}
                <Card.Text className="profile-item">Favorite Movies:</Card.Text>
                {FavoriteMovies.length === 0 && <div>You have no favorite movies.</div>}
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
                  <Link to={`/`}>
                    <Button className="back-button" block>Back</Button>
                  </Link>
                  <Button className="delete-user" block onClick={(e) => this.handleDeregister(e)}>Delete Profile</Button>
                </div>
              </Card.Body>
            </Card >
          </Tab>
          <Tab eventKey="update" title="Update">
            <h1>Update Profile</h1>
            <Card className="update-card">
              <Card.Body>
                <Form className="update-form">
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      defaultValue=""
                      onChange={e => this.setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="newPassword"
                      type="password"
                      placeholder="Enter Password"
                      defaultValue=""
                      onChange={e => this.setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="newEmail"
                      type="email"
                      placeholder="Enter Email"
                      defaultValue=""
                      onChange={e => this.setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      name="newBirthday"
                      type="date"
                      placeholder="Enter Birthday"
                      defaultValue=""
                      onChange={e => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="update" type="submit" size="sm" onClick={e => this.handleUpdate(e, this.username, this.password, this.email, this.birthday, userInfo)}>Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container >
    );
  }
}