import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";
import axios from 'axios';



class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      userTable: {}
    }

    this.submitLogin = this.submitLogin.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
    this.getUserTable = this.getUserTable.bind(this);

  }

  componentDidMount() {
    this.getUserTable();
  }

  getUserTable() {
    axios.get('/userTable')
      .then((result) => {
        console.log(result);
        this.setState({
          userTable: result.data
        });
      })
      .catch((error) => {
        console.log(error, 'error');
      })
  }

  submitLogin(login, e) {
    e.preventDefault();
    axios.post('/login', {username: login.username, password: login.password})
      .then((response) => {
        console.log(this.state.userTable);

        //if to check if in database
        for(var i = 0; i < this.state.userTable.length;i++) {
          if(login.username === this.state.userTable[i].username && login.password === this.state.userTable[i].password) {
            this.props.history.push('/profile')
          }
        }
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

              <form onSubmit={this.submitLogin.bind(this, this.state.userInfo)}>
                <div className="form_element">
                  <label>Username</label>
                    <input name="username" type="text" onChange={this.updateInputs}/>
                </div>

                <div className="form_element">
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
