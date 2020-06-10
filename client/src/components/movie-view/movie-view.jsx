import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { MainView } from '../main-view/main-view';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      mainView: null
    };
  }

  render() {
    const { movie, onClick, button } = this.props;
    //const { mainView } = this.state;

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
        <div className="back-button">
          <Button onClick={() => window.open({ MainView }, "_self")} className="back-button" variant="outline-primary" size="lg">Back</Button>
        </div>
      </Container>
    );
  }
}