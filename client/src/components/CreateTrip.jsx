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
      yelpInfo: {},
      yelpResults: {},
      showReqFields: false
    };

    this.onActivityClick = this.onActivityClick.bind(this);
    this.onDateSubmission = this.onDateSubmission.bind(this);
    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }


  submitSearch(input, e) {
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
        this.props.history.push('/profile')
      })
      .catch((error) => {
        console.log('Error posting trip to DB', error)
      })
  }

  render() {
    var yelpResults = this.state.yelpResults.entries;

    return (

      <div id="createTrip">
        <Header loggedInUser = {this.props.loggedInUser} />
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
                  {this.state.dates.map((date,index) => (<div key={index}>
                      <div>{date}</div><br/>
                  </div>))}
              <input name="dateRange" type ="text" onChange={e => this.setState({date: e.target.value})}/>
              <button id="secondary" onClick={this.onDateSubmission}>+</button>
            </div>

            <div id="secondHalf">
              <label>Estimated Cost</label>
              <input name="estimatedCost" type="text" placeholder="$" onChange={e => this.setState({estCost: e.target.value})}/><br/><br/>

              {this.state.activities.map ((activity,index) => (<div key={index}><div><strong>Activity:{' '}</strong>{activity.activity} </div>
                                                       <div><strong>Description:{' '}</strong>{activity.activityDescription} </div>
                                                       <div><strong>Cost:{' $'}</strong>{activity.activityCost} </div><br/></div>
              ))}<br/>

              <label>Add an Activity</label>
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

        <InviteFriends show = {this.state.isInviteFriendModalOpen} onClose = {this.toggleModal} onAddTripClick = {this.onAddTripClick} onClose={this.toggleModal}>
          <h3>Invite friends to your trip</h3>
        </InviteFriends>

        <br></br>
        <div id="form_container">
          <h4>Search Yelp For Suggestions</h4>
          <form onSubmit={this.submitSearch.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <input name="term" type="text" placeholder='Activity' onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <input name="location" type="text" placeholder='Location' onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">Search Yelp</button>
          </form>
          <br></br>
          {
            yelpResults ? yelpResults.map((entry, index) => {
              return (<div key={index}>
                {entry.name} - Rating {entry.rating}/5
                  <br></br>
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

export default CreateTrip;
