import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './login-view.scss';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState('');

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setLogin(null);
      setValidated(true);
      return;
    }
    e.preventDefault();

    axios.post(`https://murphmovies.herokuapp.com/login`, null, {
      params: {
        Username: username,
        Password: password
      }
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };



  return (
    <Container className="login-view" fluid="true">
      <h1 className="login-title">Murph's Movies Login</h1>
      <Form noValidate validated={validated} className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            pattern="[a-zA-Z0-9]{6,}"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Username must be at least 6 alphanumeric characters long.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            pattern="[a-zA-Z0-9]{8,}"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            A password of at least 8 alphanumeric characters is required.
            </Form.Control.Feedback>
        </Form.Group>
        <Button className="submit-login" type="submit" block onClick={handleSubmit}>
          Login
          </Button>
        <Form.Group className="registration" controlId="formRegistration">
          <Form.Text className="text-muted">First time? Let's get you an account!</Form.Text>
          <Link to={`/register`}>
            <Button className="register-button" type="submit" block>
              Register
          </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container >
  );
}