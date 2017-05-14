import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import CreateTrip from './CreateTrip';
import ContributeTrip from './ContributeTrip';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: ''
    }
    this.checkUser = this.checkUser.bind(this);
  }

  checkUser(user) {
    this.setState({
      loggedInUser: user
    });
  }

  render() {
    return (
      <div>
        <Router>
            <div>
                <Route exact path="/" render={(props) => (<Home loggedInUser={this.state.loggedInUser} {...props} />)} />
                <Route path="/signup" render={(props) => (<Signup checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                <Route path="/login" render={(props) => (<Login checkUser={this.checkUser} loggedInUser={this.state.loggedInUser} {...props} />)} />
                <Route path="/profile" render={(props) => (<Profile loggedInUser={this.state.loggedInUser} {...props} />)} />
                <Route path="/createTrip" render={(props) => (!this.state.loggedInUser ?
                    (<Redirect to="/login"/>) : (<CreateTrip loggedInUser={this.state.loggedInUser} {...props} />))} />
                <Route path="/contributeTrip" render={(props) => (!this.state.loggedInUser ?
                  (<Redirect to="/login"/>) : (<ContributeTrip loggedInUser={this.state.loggedInUser} {...props} />))} />
            </div>
        </Router>
      </div>
  )}
}


export default App;
