import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userTrip: {}
    }
    this.postTrip = this.postTrip.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  getProfile() {
    axios.get('/profile')
      .then((result) => {
          var userTrip = this.state.userTrip;
          userTrip['userName'] = result.data.user[0].username;
          userTrip['tripName'] = result.data.trips;
          this.setState({userTrip})
      })
      .catch((error) => {
          console.error(error);
      })
  }

  componentDidMount() {
    this.getProfile();
  }

  postTrip(trip) {
    this.props.history.push('/contributeTrip')
    axios.post('/tripName', {trip: trip})
      .then(() => {
        console.log('success')
      })
      .catch(() => {
        console.log('error')
      })
  }

  getProfile() {
    axios.get('/profile')
      .then((result) => {
          var userTrip = this.state.userTrip;
          userTrip['userName'] = result.data.user[0].username;
          userTrip['tripName'] = result.data.trips;
          this.setState({userTrip})
      })
      .catch((error) => {
          console.error(error);
      })
  }
  // Helper function for formatting
  capitalize(word) {

    // console.log("word", word);
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {

    var listOfTrips = this.state.userTrip.tripName;
    var user = this.state.userTrip.userName;

    return (
      <div id="profile">
        <Header />
        <div id="content">
          <div id="profileMain">
            <h1>Welcome {user ? this.capitalize(user):null}!</h1>
            <div id="yourTrips">
              <h4>Your Trips</h4>
            </div>
            {listOfTrips ? listOfTrips.map((trip, index) => {
              return (<div onClick={this.postTrip.bind(this,trip)} id="tripCard" key={index}>{trip}</div>)
            }):(<div id="emptyTrips">You have no trip plans.</div>)}
            <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
