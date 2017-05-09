import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

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
            userTrip['username'] = result.data[0].username;
            this.setState({userTrip})
        })
        .catch((error) => {
            console.error(error);
        })
  }

  render() {
    return (
        <div>
            <h1>Profile Page</h1>
            <div>{this.state.userTrip.username}</div>
        </div>
    )
  }
}

export default Profile;
