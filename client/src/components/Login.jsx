import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";
import axios from 'axios';



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    }

    this.submitLogin = this.submitLogin.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  submitLogin(login, e) {
    e.preventDefault();
    axios.post('/login', {username: login.username, password: login.password})
      .then(({response}) => {
        console.log(response);
      })
      .catch(err => {
        console.error("error in post entries", err);
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
      <div>
        <Header />
          <div id="content">
              <div id="form_container">
              <h3>Log in</h3>

              <form>
                <div class="form_element">
                  <label>Username</label>
                    <input name="username" type="text" onChange={this.updateInputs}/>
                </div>

                <div class="form_element">
                  <label>Password</label>
                  <input name="password" type="password" onChange={this.updateInputs}/>
                </div>
                <button>Log In</button>
              </form>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;
