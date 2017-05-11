import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Header from"./Header";
import axios from 'axios';
import App from "./App";


class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: ''
    }
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
          <div className="modal" style={modalStyle}>
            {this.props.children}
            <label>Username</label>
            <input name="friendName" type ="text" onChange={e => this.setState({friend: e.target.value})}/><br/><br/>

            <div className="footer">
              <button onClick={(e) => {this.props.onAddTripClick(e, this.state.friend)}}>
                Submit trip
              </button>
            </div>
          </div>
        </div>
    )
  }
}

export default InviteFriends;
