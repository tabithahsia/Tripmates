import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="headercontainer">
        <h1>Tripmates</h1>
        <h6>It's Trippy Mayne!</h6>
        <a href="/" id="login">Log In</a><br/>
        <a href="/" id="signup">Sign Up</a>
      </div>
    )
  }
}

export default Header;
