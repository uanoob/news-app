import React, { Component } from 'react';
import './App.css';

import Select from 'react-select';
import Articles from './components/Articles';

class App extends Component {
  state = {
    selection: null,
  };

  changeSelection = (selection) => {
    this.setState({
      selection,
    });
  };

  render() {
    const { selection } = this.state;
    return (
      <div>
        <Select value={selection} onChange={this.changeSelection} isMulti />
        <Articles />
      </div>
    );
  }
}

export default App;
