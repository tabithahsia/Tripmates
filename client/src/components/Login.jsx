import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      showErrorMsg: false
    }
    this.submitLogin = this.submitLogin.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  submitLogin(login, e) {
    e.preventDefault();

    axios.post('/login', {username: login.username, password: login.password})
      .then((response) => {
        //if username and password combo matches
        if (response.data) {
          this.props.checkUser(this.state.userInfo['username']);
          this.props.history.push('/profile')
        } else {
          this.setState({
            showErrorMsg: true
          })
          console.log("Invalid username/password combination.");
        }
      })
      .catch(err => {
        console.error("Error logging in", err);
      })
  }

  updateInputs(e) {
    var userInfo = this.state.userInfo;
    var name = e.target.name;
    var value = e.target.value;

    userInfo[name] = value;
    this.setState({userInfo});
  }

  render() {
    return (
      <div id="login">
        <Header />
          <div className="container">
            <div className="content wide">
                <div id="form_container">
                <h2>Log in</h2>
                <form onSubmit={(e)=> this.submitLogin(this.state.userInfo, e)}>
                  <div className="form_element">
                    <label>Username</label>
                      <input name="username" type="text" onChange={this.updateInputs}/>
                  </div>

                  <div className="form_element">
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.updateInputs}/>
                  </div>

                  {this.state.showErrorMsg ? (
                    <div className="errorMsg">Invalid username/password combination.</div>
                  ) : null}

                  <button>Log In</button>
                </form>
                </div>
              </div>
          </div>
      </div>
    )
  }
}

export default Login;
