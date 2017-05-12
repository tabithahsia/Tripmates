import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import InviteFriends from './InviteFriends';


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
      estCost: "",
      votes: 0,
      isInviteFriendModalOpen: false,
      showReqFields: false
    };

    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    // this.getActivities = this.getActivities.bind(this);

  }



  componentDidMount() {
    // this.getActivities();
  }

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

  // getActivities() {
  // axios.get('/activities')
  // .then((result) => {
  //     this.setState({activitiesToRender: result.data})
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // }

  onActivityClick(e) {
    e.preventDefault();
    var arr = this.state.activities;
    var activityObject = {
       activity: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    };
    arr.push(activityObject);
    this.setState({activities: arr})
    // this.getActivities();
  }

  onDateSubmission (e) {
    e.preventDefault();
    var arr = this.state.dates;
    arr.push(this.state.date);
    this.setState({dates: arr});
  }

  onAddTripClick (e, friend) {
    e.preventDefault();

    axios.post('/tripInfo', {loggedInUser: this.props.loggedInUser, dates: this.state.dates, activities: this.state.activities, destination: this.state.destination, tripName: this.state.tripName, estCost: this.state.estCost, friend: friend, votes: this.state.votes})

      .then((response) => {
        console.log('Successfully posted trip to DB')
      })
      .catch((error) => {
        console.log('Error posting trip to DB', error)
      })
      this.props.history.push('/profile')


  }

  render() {
    return (

      <div id="createTrip">
        <Header />
        <div id="content">
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
                  {this.state.dates.map(date => (<div>
                      <div>{date}</div>
                  </div>))}
              <input name="dateRange" type ="text" onChange={e => this.setState({date: e.target.value})}/>
              <button id="secondary" onClick={this.onDateSubmission}>+</button>
            </div>

            <div id="secondHalf">
              <label>Estimated Cost</label>
              <input name="estimatedCost" type="text" placeholder="$" onChange={e => this.setState({estCost: e.target.value})}/><br/><br/>

              <label>Add an Activity</label>
              {this.state.activities.map (activity => (<div><div>{activity.activity} </div>
                                                       <div>{activity.activityDescription} </div>
                                                        <div>{activity.activityCost} </div></div>
              ))}
              <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
              <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
              <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>
              <button id="secondary" onClick={this.onActivityClick}>+</button>
            </div>
            <button id="primary" onClick={this.toggleModal}>Next</button>
          </form>
          {this.state.showReqFields ? (<p className="errorMsg">Trip name is required</p>) : null }

          </div>

        </div>

        <InviteFriends show = {this.state.isInviteFriendModalOpen} onClose = {this.toggleModal} onAddTripClick = {this.onAddTripClick} onClose={this.toggleModal} >
          <h3>Invite friends to your trip</h3>
        </InviteFriends>

      </div>
    )
  }
}

export default CreateTrip;
