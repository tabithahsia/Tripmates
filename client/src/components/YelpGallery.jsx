import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// [TO DO: Might be able to refactor with YelpSearch to reuse more code]
class YelpGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yelpInfo: {},
      yelpResults: {}
    }
    this.fetchYelpInfo = this.fetchYelpInfo.bind(this);
  }

  componentDidMount() {
    this.fetchYelpInfo();
  }

  fetchYelpInfo() {
    axios.get('/yelp', {
      params: {
        term: "hikes",
        location: "california",
        sort_by: "rating",
        numResults: 6,
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

  render() {
    var yelpResults = this.state.yelpResults.entries;

    return (
      <div className="yelpContainer gallery">
        <div className="yelpContents">
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

export default YelpGallery;
