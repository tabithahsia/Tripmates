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
  }

  render() {
    return (
      <div>
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/createTrip" component={CreateTrip}/>
                <Route path="/contributeTrip" component={ContributeTrip}/>
            </div>
        </Router>
      </div>
  )}
}


export default App;
