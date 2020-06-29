import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './update-view.scss';

export function UpdateView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setDob] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(`https://murphmovies.herokuapp.com/users/${username}`, null, {
        headers:
          { Authorization: `Bearer ${token}` },
        params: {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(`Successfully Updated ${username}'s Info`);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Error registering User')
      });
  };

  return (
    <Container className="registration-container">
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
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
            onChange={(e) => setDob(e.target.value)} />
        </Form.Group>
        <Button className="update-user" type="submit" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </Container>
  );
}
