import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header";
import axios from "axios";

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class ContributeTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	tripName: ""
    };

    this.getTripName = this.getTripName.bind(this);
  }

  componentDidMount() {
  	this.getTripName();
  }

  getTripName() {
  	axios.get('/tripName')
	   .then((result) => {
	        //console.log(result.data);
	      this.setState({tripName: result.data[0].trip})
	    }) 
	    .catch((error) => {
	      console.error(error);
	    })
  }

  render() {
    return (

      <div>
        <Header />

        <h1>Contribute To a Trip</h1>

        <div id="contributeTripParent">
          <form>
          <h4 id="subheader">Stay Trippy!</h4>

          <div id="firstHalf">
            <h1>Destination:</h1>
            <h3>{this.state.tripName}</h3> <br/>

            <label>Date Range Options </label><br/>
            <div id='dateRanges'></div>

            Comments: <br/>
            <textarea rows="4" cols="30"></textarea>
          </div>

          <div id="secondHalf">
            <h1>Estimated Cost:</h1><br/>
            

            <label>Activity Options</label>
            <div id='activityOptions'></div>

            <label> Add an Activity </label>  
            <input name="activity" type ="text" placeholder="Activity name"/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link"/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost"/>
            <button id="secondary">+</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
