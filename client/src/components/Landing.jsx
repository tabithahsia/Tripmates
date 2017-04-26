import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="frontpic">
            <img src="images/Front_page_pic.jpg"></img>
        </div>
    )
  }
}

export default Landing;

        
    