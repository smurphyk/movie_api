import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructrue it later
    this.state = {};
  }

  // this overrides the render() method fo the superclass
  render() {
    return (
      <div className="main-view"></div>
    );
  }
}