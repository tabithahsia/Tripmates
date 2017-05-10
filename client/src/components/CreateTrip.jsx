import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header";
import axios from 'axios';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class CreateTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      date: "",
      activities: [],
      activityName: "",
      activityDescription: "",
      activityCost: "",
      tripName: "",
      destination: "",
      estCost: ""

    };

    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onaddTripClick = this.onaddTripClick.bind(this);
  }

  onActivityClick(e) {
    e.preventDefault();
    var activityObject = {
       activity: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    };
    this.state.activities.push(activityObject);
    console.log('activities array', this.state.activities);

    console.log('trip name', this.state.tripName);
    console.log('destination', this.state.destination);
    console.log('estCost',this.state.estCost);

  }

  onDateSubmission (e) {
    e.preventDefault();
    this.state.dates.push(this.state.date);
    console.log('date range array', this.state.dates);
  }

  onaddTripClick (e) {
    e.preventDefault();
    axios.post('/tripInfo', {dates: this.state.dates, activities: this.state.activities, destination: this.state.destination, tripName: this.state.tripName, estCost: this.state.estCost})
      .then(({response}) => {
        console.log('sucessful post')
      })
      .catch((error) => {
        console.log('error in post for trip form', error)
      })
      this.props.history.push('/profile')
  }

  render() {
    return (

      <div>
        <Header />

        <div id="createTripParent">
          <form>
          <h3 id="pageheader">Create a Trip</h3>
          <h4 id="subheader">Get Trippy!</h4>

          <div id="firstHalf">
            <label >Trip Name</label>
            <input name="tripName" type="text" onChange={e => this.setState({tripName: e.target.value})}/>

            <label>Destination</label>
            <input name="tripName" type="text" onChange={e => this.setState({destination: e.target.value})} /><br/><br/>

            <label>Date Range</label>
            <input name="dateRange" type ="text" onChange={e => this.setState({date: e.target.value})}/>
            <button id="secondary" onClick={this.onDateSubmission}>+</button>
          </div>

          <div id="secondHalf">
            <label>Estimated Cost</label>
            <input name="estimatedCost" type="text" placeholder="$" onChange={e => this.setState({estCost: e.target.value})}/><br/><br/>

            <label>Add an Activity</label>
            <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>
            <button id="secondary" onClick={this.onActivityClick}>+</button>
          </div>
          <button id="primary" onClick={this.onaddTripClick}>Add trip</button>
        </form>
        </div>
      </div>
    )
  }
}

export default CreateTrip;
