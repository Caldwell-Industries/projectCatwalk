import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QandA_app from './components/Q&A/QandA_app.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>HELLO</div>
        <QandA_app />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));