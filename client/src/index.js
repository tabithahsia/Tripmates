import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import App from "./components/App";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreateTrip from './components/CreateTrip';
import ContributeTrip from './components/ContributeTrip';


ReactDOM.render(
  <div>
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/createTrip" component={CreateTrip}/>
            <Route path="/contributeTrip" component={ContributeTrip}/>

        </div>
    </Router>
  </div>
, document.getElementById('app'));
