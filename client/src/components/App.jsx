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
            <Link to="/createTrip"><button id="mainCTA">Create a trip</button></Link>
        </div>
        <div id="placeholderdiv"><Link to="/contributeTrip"><button id="mainCTA">Contribute to a trip</button></Link></div>

      </div>
    )
  }
}

export default App;
