import React, { Component } from 'react';
import SubmitNew from './pages';
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     listNewData: listNewData
  //   };
  // }

  render() {
    return (
      <div className="App">
        <SubmitNew />
      </div>
    );
  }
}

export default App;