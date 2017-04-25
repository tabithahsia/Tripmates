import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">React app is rendering</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
