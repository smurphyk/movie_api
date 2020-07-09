import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { Link } from 'react-router-dom';

import './movie-view.scss';
import { setMovie } from '../../actions/actions';
import { connect } from 'react-redux';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
  }

  handleAddFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: `https://murphmovies.herokuapp.com/users/${username}/Movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(`${movie.Title} was add to Favorites`);
      }).catch(function (err) {
        console.log(err)
      })
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Card className="movie-view">
        <Card.Img className="movieView-poster" src={movie.ImagePath}></Card.Img>
        <Card.Title className="movie-title">{movie.Title}</Card.Title>
        <Card.Text className="movie-description">{movie.Description}</Card.Text>
        <br></br>
        <ListGroup variant="flush">
          <ListGroup.Item className="movie-genre"><span className="genre-label">Genre</span>
            <br></br>
            {movie.Genre.Name}</ListGroup.Item>
          <ListGroup.Item className="movie-director"><span className="director-label">Director</span>
            <br></br>
            {movie.Director.Name}</ListGroup.Item>
        </ListGroup>
        <br></br>
        <Button size="lg" className="favorite-button" value={movie._id}
          onClick={(e) => this.handleAddFavorite(e, movie)} > Add to Favorites</Button>
        <Link to={`/`}>
          <Button className="movies-button" size="lg">Back</Button>
        </Link>
      </Card >
    );
  }
}

let mapStateToProps = state => {
  return { movie: state.movie }
}

export default connect(mapStateToProps, { setMovie })(MovieView);

MovieView.propTypes = {
  movie: PropTypes.shape({
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
  })
};