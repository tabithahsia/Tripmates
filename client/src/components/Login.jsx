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
    this.componentDidMount = this.componentDidMount.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '106404783249150',
      cookie     : true,  // enable cookies to allow the server to access
                        // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.1' // use version 2.1
    });

    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }.bind(this);

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  // document.getElementById('status').innerHTML =
  //   'Thanks for logging in, ' + response.name + '!';
  });
}
// This is called with the results from from FB.getLoginStatus().
statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    this.testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    // document.getElementById('status').innerHTML = 'Please log ' +
    // 'into Facebook.';
  }
}

checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log('heres response! ', response)
    this.statusChangeCallback(response);
    if(response.status === 'connected') {
      FB.api('/me', (response) => {
      console.log('connected, here we go...', response);
      var user = {username: response.name,
              password: '1234'}
      var userInfo = this.state.userInfo;
      userInfo.name = response.name;
      this.setState({userInfo})
      this.submitLogin(user);
    //  (e)=>{this.submitSignup(user, e)};
  });
    }
    console.log('RES STATUS: ', response.status);
  }.bind(this));
}

handleClick() {
  console.log('clicky');
  FB.login(this.checkLoginState());
}


  submitLogin(login, e) {
    if(e) {
      e.preventDefault();
    }

    axios.post('/login', {username: login.username, password: login.password})
      .then((response) => {
        //if username and password combo matches
        if (response.data) {
          console.log('userdata',this.state.userInfo)
          this.props.checkUser(this.state.userInfo.username);
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
                    <a href="#" onClick={this.handleClick}><img src="./fbLogo.png" className="fbLogo"></img></a>

                </form>
                </div>
              </div>
          </div>
      </div>
    )
  }
}

export default Login;
