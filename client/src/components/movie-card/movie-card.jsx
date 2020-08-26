import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Col className="card__columns" fluid="true" style={{ maxWidth: '25rem', minWidth: '25rem' }}>
        <Card className="movie__card" fluid="true" style={{ maxWidth: '25rem', minWidth: '25rem' }}>
          <Card.Img className="movie__poster" variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movie__title">{movie.Title}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className="card__button-container">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="button" size="lg" block className="open__button">Details</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="card__button-container">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="button" className="director__button" size="lg" block>Director Info</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="card__button-container">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="button" className="genre__button" size="lg" block>Genre Info</Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};