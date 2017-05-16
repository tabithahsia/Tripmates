import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// [TO DO: Might be able to refactor with YelpGallery to reuse more code]
class YelpSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yelpInfo: {},
      yelpResults: {}
    }
    this.updateInputs = this.updateInputs.bind(this);
    this.fetchYelpInfo = this.fetchYelpInfo.bind(this);
  }

  fetchYelpInfo(input, e) {
    e.preventDefault();
    axios.get('/yelp', {
      params: {
        term: input.term,
        location: input.location,
        sort_by: "best_match",
        numResults: 3
      }
    })
      .then((response) => {
        var yelpResults = this.state.yelpResults;
        yelpResults['entries'] = response.data.resultArray;
        this.setState({ yelpResults });
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

    return (
      <div className="yelpContainer">
        <div className="yelpContents">
          <h4>Search Yelp for activity ideas</h4>
          <form id="yelpForm" onSubmit={this.fetchYelpInfo.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <input name="term" type="text" placeholder='Activity' onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <input name="location" type="text" placeholder='Location' onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">Search</button>
          </form>
          <div className="yelpResults">
            { yelpResults ? yelpResults.map((entry, index) => {
                return (<div key={index} id="yelpResultItem">
                  <div id="pic_container">
                    <img src={entry.image_url} />
                  </div>
                  <div>{entry.name}</div>
                  <div id="rating">Rating: {entry.rating}/5</div>
                </div>)
              }) : null }
          </div>
        </div>
      </div>
    )
  }
}

export default YelpSearch;
