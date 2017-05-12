import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

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
    console.log("check user called");
    this.setState({
      loggedInUser: user
    });
  }

  render() {
    return (
      <div>
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" render={(props) => (<Login checkUser={this.checkUser} history={history} />)} />
                <Route path="/signup" component={Signup}/>
                <Route path="/profile" render={(props) => (<Profile checkUser={this.checkUser} />)} />
                <Route path="/createTrip" component={CreateTrip}/>
                <Route path="/contributeTrip" component={ContributeTrip}/>
            </div>
        </Router>
      </div>
  )}
}


export default App;
