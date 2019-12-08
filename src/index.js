import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
