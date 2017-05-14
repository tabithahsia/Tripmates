import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';


class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: '',
      friends: []
    }

    this.addFriendClick = this.addFriendClick.bind(this);
  }

  addFriendClick() {
    var arr = this.state.friends;
    arr.push(this.state.friend)
    this.setState({friends: arr})
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
      minHeight: 210,
      margin: '0 auto',
      padding: 30,
      overflow: 'auto'
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <ul id="friendList">{this.state.friends.map((friend,index) => (<li key={index}>{friend}</li>))}</ul>
          <input name="friendName" placeholder="Username" type ="text" onChange={e => this.setState({friend: e.target.value})}/>

          <button id="secondary" onClick={this.addFriendClick}>+</button>

          <button id="modalButton" onClick={(e) => {this.props.onAddTripClick(e, this.state.friends)}}>
            Submit trip
          </button>
          <a href="/" onClick={(e) => this.props.onClose(e)}>Cancel</a>
        </div>
      </div>
    )
  }
}

export default InviteFriends;
