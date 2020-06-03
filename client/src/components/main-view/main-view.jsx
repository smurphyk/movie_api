import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
  constructor() {
    super();

    // Initialize the state to an empty object so we can destructrue it later
    this.state = {};
  }

  componentDidMount() {
    axios.get('https://murphmoives.herokuapp.com/movies')
      .then(resoponse => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // this overrides the render() method of the superclass
  render() {

    // Before data is initially loaded
    const { movies } = this.state;

    // Before movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}