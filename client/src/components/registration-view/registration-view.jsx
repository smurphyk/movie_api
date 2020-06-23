import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    axios.post(`https://murphmovies.herokuapp.com/users`, null, {
      params: {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Container className="registration-container">
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => createUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
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
        <Form.Group controlId="formBasicDob">
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