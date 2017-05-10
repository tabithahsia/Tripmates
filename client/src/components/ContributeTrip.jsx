import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header";
import axios from "axios";

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class ContributeTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	tripName: "",
      dates: [],
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: ''
    };

    this.getTripName = this.getTripName.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
  }

  componentDidMount() {
  	this.getTripName();
    this.getDates();
    this.getActivities();
  }

  getTripName() {
  	axios.get('/tripName')
	   .then((result) => {
	     //console.log(result.data);
	      this.setState({tripName: result.data[0]})
	    }) 
	    .catch((error) => {
	      console.error(error);
	    })
  }

    getDates() {
      axios.get('/dates')
     .then((result) => {
       console.log('datesdata', result.data);
        this.setState({dates: result.data})
      }) 
      .catch((error) => {
        console.error(error);
      })
    }

    getActivities() {
      axios.get('/activities')
     .then((result) => {
       console.log('actdata', result.data);
        this.setState({activities: result.data})
      }) 
      .catch((error) => {
        console.error(error);
      })
    }

    onActivityClick(e) {
      e.preventDefault();
      var activityObject = {
         activity: this.state.activityName,
         activityDescription: this.state.activityDescription,
         activityCost: this.state.activityCost
      }
      axios.post('/newactivity',activityObject)
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
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
            <h1>Destination:</h1><br/>
            <h3>{this.state.tripName.destination}</h3> <br/>

            <h1>Date Range Options </h1><br/>
            {this.state.dates.map(date => (<div><div>{date.dateOption}</div><br/></div>))}

            Comments: <br/>
            <textarea rows="4" cols="30"></textarea>
            <button id="secondary">+</button>
          </div>

          <div id="secondHalf">
            <h1>Estimated Cost:</h1><br/>
            <h3>${this.state.tripName.est_cost}</h3> <br/>
            

            <label>Activity Options</label>
            {this.state.activities.map(activity => (<div><div>Name: {activity.activityName} Description: {activity.activityDescription} Cost: ${activity.est_cost}</div><br/></div>))}

            <label>Add an Activity</label>
            <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>
            <button id="secondary" onClick={this.onActivityClick}>+</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
