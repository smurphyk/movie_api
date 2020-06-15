import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <Container className="genre-view">
        <Card className="genre-card">
          <Card.Body>
            <Card.Title className="genre-name">{genre.Name}</Card.Title>
            <Card.Text>Description: {genre.Description}</Card.Text>
            <Link to={`/`}>
              <Button className="back-button" variant="outline-link" size="lg">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}