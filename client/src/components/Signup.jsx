import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: {}
    }

    this.submitSignup = this.submitSignup.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
  }

  submitSignup(signup, e) {
    e.preventDefault();
    axios.post('/signup', {username: signup.username, password: signup.password})
      .then(({response}) => {
        console.log(response);
      })
      .catch(err => {
        console.error("error in post entries", err);
      })
  }

  updateInputs(e) {
    var userInput = this.state.userInput;
    var name = e.target.name;
    var value = e.target.value;

    userInput[name] = value;
    this.setState({userInput});
  }

  render() {
    return (
      <div>
        <div>
          <Header />

          <h4>Sign up</h4>
          <form onSubmit={this.submitSignup.bind(this, this.state.userInput)}>
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
      </div>
    )
  }
}

export default Signup;
