import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Col className="card-columns" fluid="true" style={{ maxWidth: '25rem', minWidth: '25rem' }}>
        <Card className="movie-card" fluid="true" style={{ maxWidth: '25rem', minWidth: '25rem' }}>
          <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movie-title">{movie.Title}</Card.Title>
            <ListGroup variant="flush">
              {/*} <ListGroup.Item className="movie-description">{movie.Description}</ListGroup.Item> */}
              <ListGroup.Item className="button-container">
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link" size="lg" block className="open-button">Details</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="button-container">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className="director-button" size="lg" block>Director Info</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="button-container">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="genre-button" size="lg" block>Genre Info</Button>
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
    // imageUrl: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};