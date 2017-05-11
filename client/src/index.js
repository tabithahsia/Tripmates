import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreateTrip from './components/CreateTrip';
import ContributeTrip from './components/ContributeTrip';



ReactDOM.render(<App />, document.getElementById('app'));
