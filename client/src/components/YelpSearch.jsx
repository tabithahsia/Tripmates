import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';


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
        location: input.location
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
      <div id="yelp_contents">
        <div id="form_container">
          <h4>Search Yelp For Suggestions</h4>
          <form onSubmit={this.fetchYelpInfo.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <input name="term" type="text" placeholder='Activity' onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <input name="location" type="text" placeholder='Location' onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">Search Yelp</button>
          </form>

          {
            yelpResults ? yelpResults.map((entry, index) => {
              return (<div key={index}>
                {entry.name} - Rating {entry.rating}/5

                <div id="pic_container">
                  <img src={entry.image_url}></img>
                </div>
              </div>)

            }) : null
          }
        </div>
      </div>
    )
  }
}

export default YelpSearch;
