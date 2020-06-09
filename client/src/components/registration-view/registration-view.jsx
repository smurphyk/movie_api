import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState('');
  const [password, createPassword] = useState('');
  const [email, createEmail] = useState('');
  const [birthday, createDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://murphmovies.herokuapp.com/login', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        alert("You now exist in the world of Murph's Movies! Please log in, if you dare!");
        console.log(data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Swing and a miss! There was an error registering user');
      });
  };

  return (
    <Container className="registration-container">
      <Form className="registration-form">
        <Form.Group controlID="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => createUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlID="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => createPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => createEmail(e.target.value)} />
          <Form.Text className="text-muted">
            Your info is safe with us! We will never share with anyone, even your own mother.
            </Form.Text>
        </Form.Group>
        <Form.Group controlID="formBasicDob">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="mm/dd/yyyy"
            value={birthday}
            onChange={(e) => createDob(e.target.value)} />
        </Form.Group>
        <Button className="submit-user" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  newUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  })
};