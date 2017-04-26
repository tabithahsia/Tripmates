import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import App from "./components/App";
import Login from './components/Login';
import Signup from './components/Signup';

ReactDOM.render(
  <div>
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
        </div>
    </Router>
  </div>
, document.getElementById('app'));
