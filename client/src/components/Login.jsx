import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";
import axios from 'axios';



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formEntries: {}
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
    var formEntries = this.state.formEntries;
    var name = e.target.name;
    var value = e.target.value;

    formEntries[name] = value;
    this.setState({formEntries});
  }

  render() {
    return (
      <div>
        <Header />

        <h4>Login Page</h4>
        <form onSubmit={this.submitLogin.bind(this, this.state.formEntries)}>
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
