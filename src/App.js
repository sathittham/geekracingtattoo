import React from 'react';
import logo from './logo.svg';
import './App.css';
import tattooGenerator from './containers/tattooGenerator';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Router>
          <Link to="/tattooGenerator">tattooGenerator</Link>
          <Route path="/tattooGenerator" component={tattooGenerator} />
        </Router>
      </header>
    </div>
  );
}

export default App;
