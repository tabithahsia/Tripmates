import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    console.log('test');
    super(props);
  }

  render() {
    return (
      <div id="main">hello</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
