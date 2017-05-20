import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import InviteFriends from './InviteFriends';
import YelpSearch from './YelpSearch';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Calendar from './Calendar';

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
      showReqFields: false,
      datePlaceholder: '',
      activityPlaceholder: '',
      descriptionPlaceholder: '',
      costPlaceholder: ''
    };
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({activities: listOfActivities, activityPlaceholder: '', descriptionPlaceholder: '', costPlaceholder: ''})
  }
  // Add new date to dates array on '+' click (doesn't post directly to DB)
  onDateSubmission (e) {
    e.preventDefault();
    var listOfDates = this.state.dates;
    listOfDates.push(this.state.date);
    this.setState({dates: listOfDates, datePlaceholder: ''});
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
  handleChange(date) {
    this.setState({
      date: date,
      datePlaceholder: date
    });
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

              <input name="dateRange" placeholder="mm/dd/yyyy - mm/dd/yyyy" value={this.state.datePlaceholder} type ="text" onChange={e => this.setState({date: e.target.value, datePlaceholder: e.target.value})}/>
              <Calendar />
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
              <input name="activity" type ="text" placeholder="Activity" value={this.state.activityPlaceholder} onChange={e => this.setState({activityName: e.target.value, activityPlaceholder: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Description/Link" value={this.state.descriptionPlaceholder} onChange={e => this.setState({activityDescription: e.target.value, descriptionPlaceholder: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Cost" value={this.state.costPlaceholder} onChange={e => this.setState({activityCost: e.target.value, costPlaceholder: e.target.value})}/>
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
