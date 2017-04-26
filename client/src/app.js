import React from 'react';
import ReactDOM from 'react-dom';
import Header from"./components/Header.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="frontpic"><img src="images/Front_page_pic.jpg"></img></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
