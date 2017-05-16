import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';


class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: '',
      friends: [],
      users: [],
      userNotFound: false
    }
    this.addFriendClick = this.addFriendClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }


  // Request list of all usernames [TO DO: Refactor to check if username exists on serverside]
  getUsers() {
    axios.get('/users')
      .then((result) => {
        this.setState({users: result.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Add invited friend to friends array on '+' click (doesn't post directly to DB) [TO DO: Refactor to check if username exists on serverside]
  addFriendClick() {
    var count = 0;
    for(var i = 0; i < this.state.users.length;i++) {
      if(this.state.users[i].username === this.state.friend) {
        count++;
      }
    }
    if(count === 0) {
      this.setState({userNotFound: true})
    } else {
        var listOfFriends = this.state.friends;
        listOfFriends.push(this.state.friend)
        this.setState({friends: listOfFriends})
    }
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div id="modal">
          {this.props.children}
          <ul id="friendList">{this.state.friends.map((friend,index) => (<li key={index}>{friend}</li>))}</ul>
          <input name="friendName" placeholder="Username" type ="text" onChange={e => this.setState({friend: e.target.value})}/>

          <button id="secondary" onClick={this.addFriendClick}>+</button>

          {this.state.userNotFound ? (
            <div className="errorMsg">User doesn't exist.</div>
          ) : null}

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
