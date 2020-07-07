import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Container className="director-view">
        <Card className="director-card">
          <Card.Body className="director-body">
            <Card.Title className='director-name'>{director.Name}</Card.Title>
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

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};