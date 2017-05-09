import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        userTrip: {}
    }
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
      axios.get('/profile')
        .then((result) => {
            var userTrip = this.state.userTrip;
            console.log('resultss', result);
            userTrip['userName'] = result.data.user[0].username;
            userTrip['tripName'] = result.data.trips; 
            this.setState({userTrip})
        }) 
        .catch((error) => {
            console.error(error);
        })
  }

  render() {
    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            <div>Hey {this.state.userTrip.userName}</div>
            <div>Your Trips {this.state.userTrip.tripName}</div>
        </div>
    )
  }
}

export default Profile;
