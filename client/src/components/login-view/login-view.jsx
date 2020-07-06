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
  const [login, setLogin] = useState('');

  const handleSubmit = (e) => {
    const from = e.currentTarget;
    if (Form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setLogin(null);
      setValidated(true);
      return;
    }
    e.preventDefault();

    axios.post(`https://murphmovies.herokuapp.com/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        if (!response.data.user) {
          setLogin(true);
        }
        else {
          props.onLoggedIn(data);
        }
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  const setLoginUsername (e) => {
    setUsername(e.target.value);
    setLogin(null);
  }

  const setLoginPassword = (e) => {
    setPassword(e.target.value);
    setLogin(null);
  }



  return (
    <Container className="login-view" fluid="true">
      <h1 className="login-title">Murph's Movies Login</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            pattern="[a-zA-Z0-9]{6}"
            title="Username must contain at least 6 characters and may only include numbers, 
            lowercase letters, and uppercase letters, e.g. User12."
            required
            value={username}
            onChange={e => setLoginUsername(e)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            pattern="[a-zA-Z0-9]{8}"
            title="Password must contain at least 8 characters and may only include numbers, 
            lowercase letters, and uppercase letters, e.g. Pword1234."
            required
            value={password}
            onChange={e => setLoginPassword(e)} />
        </Form.Group>
        <Button className="submit-login" type="submit">
          Login
          </Button>
        <Form.Group className="registration" controlId="formRegistration">
          <Form.Text className="text-muted">First time? Let's get you an account!</Form.Text>
          <Link to={`/register`}>
            <Button className="register-button" type="submit">
              Register
          </Button>
          </Link>
        </Form.Group>
      </Form>
    </Container >
  );
}