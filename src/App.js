import React, { Component } from 'react';
import UserList from './components/UserList';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserList />
      </div>
    );
  }
}

export default App;
