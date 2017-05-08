import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <Header />
        <div id="banner">
          <div id="tagline">Explore the world with your trippy trippy mates</div>
          <button id="mainCTA">Create a trip</button>
        </div>
          <Link to="/createTrip">Add a trip</Link>
        <div id="placeholderdiv"></div>
      </div>
    )
  }
}

export default App;
