import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Container className="card-container">
        <Card className="movie-card">
          <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movie-title">{movie.Title}</Card.Title>
            <Card.Text className="movie-description">{movie.Description}</Card.Text>
            <Button onClick={() => onClick(movie)} variant="primary" size="lg" block className="open-button">Open</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};