import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setFavorite } from '../../actions/actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './movie-view.scss';

const mapStateToProps = state => {
  const { favorite } = state;
  return { favorite };
};

function MovieView(props) {
  const { movie, favorite } = props;
  let username = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  (function () {
    axios.get(`https://murphmovies.herokuapp.com/users/${username}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer: ${token}` }
    })
      .then(response => {
        props.setFavorite(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  })();

  const addFavorite = (e) => {
    e.preventDefault();
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: `https://murphmovies.herokuapp.com/users/${username}/Movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        props.setFavorite(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var featured = '';

  if (!movie) return null;

  if (movie.featured) {
    featured = 'Yes';
  }
  else {
    featured = 'No';

    return (
      <Container className="movie-view">
        <Card className="movie-view-card">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="movie-title">{movie.Title}</Card.Title>
            <Card.Text className="movie-description">{movie.description}</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Genre: {movie.Genre.Name}
              </ListGroup.Item>
              <ListGroup.Item>
                Director: {movie.Director.Name}
              </ListGroup.Item>
              <ListGroup.Item>
                Featured: {featured}
              </ListGroup.Item>
              {favorite ?
                <ListGroup.Item>
                  <Button className="disabled-button" disabled>Favorited</Button>
                </ListGroup.Item>
                :
                <ListGroup.Item>
                  <Button className="back-button" onClick={addFavorite}>Add to Favorites</Button>
                </ListGroup.Item>
              }
            </ListGroup>
            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container >
    );
  }
}

export default connect(mapStateToProps, { setFavorite })(MovieView);
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired
};