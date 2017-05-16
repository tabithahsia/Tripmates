import React from 'react';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userTrip: {}
    }
    this.accessTrip = this.accessTrip.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  accessTrip(trip) {
    this.props.updateCurrentTrip(trip);
    this.props.history.push('/contributeTrip')
  }

  getProfile() {
    axios.get('/profile', {
      params: {
        loggedInUser: this.props.loggedInUser
      }})
      .then((result) => {
          var userTrip = this.state.userTrip;
          userTrip['tripName'] = result.data.trips;
          this.setState({userTrip})
      })
      .catch((error) => {
          console.error(error);
      })
  }

  // Helper function for formatting
  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  render() {
    var listOfTrips = this.state.userTrip.tripName;
    var user = this.props.loggedInUser;

    return (
      <div id="profile">
        <Header loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content wide">
            <h2>Welcome {user ? this.capitalize(user):null}!</h2>
            <div id="yourTrips">
              <h3>Your Trips</h3>
            </div>
            {listOfTrips ? listOfTrips.map((trip, index) => {
              return (<div onClick={() => this.accessTrip(trip)} id="tripCard" key={index}>{trip}</div>)
            }):(<div id="emptyTrips">You have no trip plans.</div>)}
            <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
