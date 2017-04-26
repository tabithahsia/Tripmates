import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./Header.jsx";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Landing from './Landing.jsx';
// import Login from './Login.jsx';

var Login = () => (
    <div>login called</div>
)


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
            <Router>
                <div>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
      </div>
    )
  }
}

export default App;