import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpInfo: {},
      yelpResults: {}
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
      }})
      .then((response) => {
        console.log('resdata',response.data.resultArray)
        console.log('one name', response.data.resultArray[0].name)
        var yelpResults = this.state.yelpResults;
        yelpResults['entries'] = response.data.resultArray;
        this.setState({yelpResults});
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

    var yelpResults = this.state.yelpResults.entries;
    console.log('in render', yelpResults)

    return (
      <div id="main">
        <Header />
        <div id="banner">
          <div id="tagline">Explore the world with your trippy trippy mates</div>
            <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
        </div>
        <br></br>
        <div id="form_container">
          <h3>Search Yelp For Suggestions</h3>
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
          <br></br>
          {
            yelpResults ? yelpResults.map((entry, index) => {
              return (<div key={index}>
                  {entry.name} - Rating {entry.rating}/5 
                  <br></br>
                  <div id="pic_container">
                  <img src={entry.image_url}></img>
                  </div>
                  </div>)

            }) : null
          }
        </div>
        <div id="placeholderdiv"><Link to="/contributeTrip"><button id="mainCTA">Contribute to a trip</button></Link></div>
        
      <div>
        
      </div>
      </div>
      
  )}
}

export default Home;

