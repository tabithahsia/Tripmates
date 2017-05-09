import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header";

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class ContributeTrip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div>
        <Header />

        <h1>Contribute To a Trip</h1>

        <div id="createTripParent">
          <form>
          <h3 id="pageheader">Add a Trip</h3>
          <h4 id="subheader">Get Trippy!</h4>

          <div id="firstHalf">
            <label>Trip Name</label>
            <input name="tripName" type="text"/>

            <label>Destination</label>
            <input name="tripName" type="text" /><br/><br/>
            <label>Date Range</label>
            <input name="dateRange" type ="text"/>
            <button id="secondary">+</button>
          </div>

          <div id="secondHalf">
            <label>Estimated Cost</label>
            <input name="estimatedCost" type="text" placeholder="$"/><br/><br/>

            <label>Add an Activity</label>
            <input name="activity" type ="text" placeholder="Activity name"/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link"/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost"/>
            <button id="secondary">+</button>
          </div>
          <button id="primary">Add trip</button>
        </form>
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
