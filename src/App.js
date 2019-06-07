import React from 'react';
import './App.css';
import config from './assets/store_config';
import Banner from './components/ui/Banner';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
    <Router>
    <Banner config={config}/>
    </Router>
    </div>
  );
}

export default App;
