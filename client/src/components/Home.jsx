import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import YelpSearch from './YelpSearch';
import YelpGallery from './YelpGallery';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <Header loggedInUser = {this.props.loggedInUser} />
        <div id="banner">
          <div id="tagline">
            Explore the world with your mates
          </div>
          <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
        </div>
        <div id="galleryHeader">
          <h2>Popular destinations</h2>
        </div>
        <YelpGallery />
      </div>
    )
  }
}

export default Home;
