import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import Navbar from './components/Navbar';
import { CurrentUserProvider } from './context/currentUser';
import CurrentUserChecker from './components/CurrentUserChecker';

const App = () => {
  return (
    <>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <Navbar />
            <Routes />
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
