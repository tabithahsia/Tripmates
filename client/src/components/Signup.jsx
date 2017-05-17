import React from 'react';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    }

    this.submitSignup = this.submitSignup.bind(this);
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

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
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

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';
  });
}

// This is called with the results from from FB.getLoginStatus().
statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    this.testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
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
      this.submitSignup(user);
    //  (e)=>{this.submitSignup(user, e)};
  });
    }
    console.log('RES STATUS: ', response.status);
  }.bind(this));
}

handleClick() {
  FB.login(this.checkLoginState());
}

  submitSignup(signup, e) {
    console.log('in submit: ', signup)
   if(e) {
     e.preventDefault();
   }
   axios.post('/signup', {username: signup.username, password: signup.password})
     .then(({response}) => {
       //this line will take you to /profile
       console.log('state username: ' ,this.state.userInfo)
       console.log('in post, username: ', this.state.userInfo.name)
       this.props.checkUser(this.state.userInfo.name);
       this.props.history.push('/profile');
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
      <div id="signup">
        <Header />
          <div className="container">
            <div className="content wide">
              <div id ="form_container">
                <h2>Sign up</h2>

                <form onSubmit={(e)=>this.submitSignup(this.state.userInfo, e)}>
                  <div className="form_element">
                    <label>Username</label>
                      <input name="username" type="text" onChange={this.updateInputs}/>
                  </div>

                  <div className="form_element">
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.updateInputs}/>
                  </div>
                  <a href="#" onClick={this.handleClick}><img src="./fbLogo.png" className="fbLogo"></img></a>

                  <button>Sign Up</button>
                </form>

              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Signup;
