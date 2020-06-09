import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './login-view.scss';
import { Link } from 'react-router-dom';
import {
  row,
  col,
} from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://murphmovies.herokuapp.com/login', {
      Username: username,
      Password: password,
    }).then((response) => {
      const data = response.data;
      props.onLoggedIn(data);
    })
      .catch((e) => {
        console.log('User does not exist');
      });
  };

  return (
    <Container className="login-container">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button className="submit-login" variant="link" type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Button variant="link" className="register-button" type="submit">
          Register
          </Button>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })
};