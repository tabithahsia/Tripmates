import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header_container">
          <div id="header_wrapper">
          <div id="logo">
            <Link to="/"><h1>Tripmates</h1></Link>
          </div>

            {this.props.loggedInUser ? (
              <nav>
                <li><a href="/logout">Log out</a></li>
                <li><Link to="/profile">Your Profile</Link></li>
                <li>Hi {this.props.loggedInUser}!</li>
              </nav>
              ) : (
                <nav>
                  <li><Link to="/login">Log in</Link></li>
                  <li><Link to="/signup">Sign up</Link></li>
                </nav>
              )}

        </div>
      </div>
    )
  }
}

export default Header;
