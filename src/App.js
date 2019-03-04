import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ItemList from './components/ItemList';
import EditForm from './components/EditForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="main-header">
            <h1>Welcome to the App</h1>
          </header>
          <Route exact path="/" component={ItemList} />
          <Route path="/edit/:id?" component={EditForm} />
          <small className="footer">Mockup App made by Cédric D.</small>
        </div>
      </Router>
    )
  }
}

export default App;
