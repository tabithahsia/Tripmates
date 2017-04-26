import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from"./Header";

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Header />
        Sign up page contents
      </div>
    )
  }
}

export default Signup;
