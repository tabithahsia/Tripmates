import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

var Signup = () => (
  <div>Signup Page</div>
)

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div id="headercontainer">
        <h1>Tripmates</h1>
        <h6>It's Trippy Mayne!</h6>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
        </ul>
      </div>

    )
  }
}

export default Header;
