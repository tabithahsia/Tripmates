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
    this.postTrip = this.postTrip.bind(this);
    this.getProfile = this.getProfile.bind(this);
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


  render() {
    var tripArray = this.state.userTrip.tripName;
   
    return (
        <div>
            <Header />
            <h1>Profile Page</h1>
            <div>Hey {this.state.userTrip.userName}</div>
            <div>Your Trips</div> 
           
            {tripArray ? tripArray.map((trip, index) => { return <div onClick={this.postTrip.bind(this,trip)} key={index}>{trip}</div> }): null}
        </div>
    )
  }
}

export default Profile;