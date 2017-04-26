import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <h4>Login Page</h4>

        <form>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
}

export default Login;
