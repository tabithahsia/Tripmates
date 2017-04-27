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

        <h4>Log in</h4>
        <form onSubmit={this.submitLogin.bind(this, this.state.userInfo)}>
        <label>
          Username:
          <input name="username" type="text" onChange={this.updateInputs}/>
        </label>
        <label>
          Password:
          <input name="password" type="text" onChange={this.updateInputs}/>
        </label>
        <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
}

export default Login;
