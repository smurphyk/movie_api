import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state();
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    Return(
      <Container className="director-view">
        <Card className="director-card">
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>Bio: {director.Bio}</Card.Text>
            <Card.Text> Birth Year: {director.Birth}</Card.Text>
            <Card.Text> Death Year: {director.Death}</Card.Text>
            <Link to={`/`}>
              <Button className="back-button" variant="outline-link" size="lg">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}