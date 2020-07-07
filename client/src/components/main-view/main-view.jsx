import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
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
      <Container className="movie-view">
        <img className="movieView-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <br></br>
        <Container className="button-container">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="director-button" size="lg">Director Info</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="genre-button" size="lg">Genre Info</Button>
          </Link>
          <br></br>
          <br></br>
          <Button size="lg" block className="favorite-button" value={movie._id}
            onClick={(e) => this.handleAddFavorite(e, movie)} > Add to Favorites</Button>
          <Link to={`/`}>
            <Button className="movies-button" size="lg" block>Back</Button>
          </Link>
        </Container >
      </Container >
    );
  }
}