import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import InviteFriends from './InviteFriends';
import YelpSearch from './YelpSearch';


class CreateTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      date: '',
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      tripName: '',
      destination: '',
      estCost: '',
      votes: 0,
      isInviteFriendModalOpen: false,
      showReqFields: false
    };

    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }


  // Toggle InviteFriends modal
  toggleModal(e) {
    e.preventDefault();
    if(!this.state.tripName) {
      this.setState({
        showReqFields: true
      })
    } else {
      this.setState({
        isInviteFriendModalOpen: !this.state.isInviteFriendModalOpen
      });
    }
  }


  // Add new activity to activities array on '+' click (doesn't post directly to DB)
  onActivityClick(e) {
    e.preventDefault();
    var listOfActivities = this.state.activities;
    var activityObject = {
       activityName: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    };
    listOfActivities.push(activityObject);
    this.setState({activities: listOfActivities})
  }


  // Add new date to dates array on '+' click (doesn't post directly to DB)
  onDateSubmission (e) {
    e.preventDefault();
    var listOfDates = this.state.dates;
    listOfDates.push(this.state.date);
    this.setState({dates: listOfDates});
  }


  // Create new trip
  onAddTripClick (e, friend) {
    e.preventDefault();

    axios.post('/tripInfo', {loggedInUser: this.props.loggedInUser, dates: this.state.dates, activities: this.state.activities, destination: this.state.destination, tripName: this.state.tripName, estCost: this.state.estCost, friend: friend, votes: this.state.votes})
      .then((response) => {
        console.log('Successfully posted trip to DB')
        this.props.history.push('/profile')
      })
      .catch((error) => {
        console.log('Error posting trip to DB', error)
      })
  }


  render() {
    return (
      <div id="createTrip">
        <Header loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content narrow">

            <form>
            <h2 id="pageheader">Create a Trip</h2>

            <div className="column1">
              <label>Trip Name</label>
              <input name="tripName" type="text" onChange={e => this.setState({tripName: e.target.value})}/>

              <label>Destination</label>
              <input name="tripName" type="text" onChange={e => this.setState({destination: e.target.value})} />

              <label>Date Range Options</label>
              {this.state.dates.map((date,index) => {
                return(<div key={index}><li className="dateItem">{date}</li></div>)})}

              <input name="dateRange" placeholder="mm/dd/yyyy - mm/dd/yyyy"type ="text" onChange={e => this.setState({date: e.target.value})}/>
              <button id="secondary" onClick={this.onDateSubmission}>+</button>
            </div>

            <div className="column2">
              <label>Estimated Cost</label>
              <input name="estimatedCost" type="text" placeholder="$" onChange={e => this.setState({estCost: e.target.value})}/>

              {this.state.activities.map ((activity,index) =>
                (<div key={index} id='activityList'>
                  <div className="activityGroup">
                    <li><span>Activity:</span> {activity.activityName} </li>
                    <li><span>Description:</span> {activity.activityDescription} </li>
                    <li><span>Cost:</span> ${activity.activityCost} </li>
                  </div>
                </div>
              ))}

              <label>Activity Ideas</label>
              <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>
              <button id="secondary" onClick={this.onActivityClick}>+</button>
            </div>

            <button id="primary" onClick={this.toggleModal}>Next</button>
          </form>

          {this.state.showReqFields ? (<p className="errorMsg">Trip name is required</p>) : null }
          </div>
        </div>

        <InviteFriends show = {this.state.isInviteFriendModalOpen} onClose = {this.toggleModal} onAddTripClick = {this.onAddTripClick} onClose={this.toggleModal} updateCurrentTrip = {this.props.updateCurrentTrip} >
          <h3>Invite friends to your trip</h3>
        </InviteFriends>

        <YelpSearch/>
      </div>
    )
  }
}

export default CreateTrip;
