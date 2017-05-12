import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpInfo: {}
    }
    this.submitSearch = this.submitSearch.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  submitSearch(input, e) {
    e.preventDefault();

    axios.get('/yelp', {
      params: {
        term: input.term,
        location: input.location
      }

      })
      .then((response) => {
        // this.props.history.push('/profile')
      })
      .catch(err => {
        console.error("Error", err);
      })
  }

  updateInputs(e) {
    var yelpInfo = this.state.yelpInfo;
    var name = e.target.name;
    var value = e.target.value;

    yelpInfo[name] = value;
    this.setState({ yelpInfo });
  }


  render() {

    return (
      <div id="main">
        <Header />
        <div id="banner">
          <div id="tagline">Explore the world with your trippy trippy mates</div>
            <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
        </div>
        <br></br>
        <div id="form_container">
          <form onSubmit={this.submitSearch.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <label>Activity</label>
              <input name="term" type="text" onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <label>Location</label>
              <input name="location" type="text" onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">Search Yelp</button>
          </form>

        </div>
        <div id="placeholderdiv"><Link to="/contributeTrip"><button id="mainCTA">Contribute to a trip</button></Link></div>
      </div>
  )}
}


export default Home;
