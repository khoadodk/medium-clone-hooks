import React, { useState, useContext } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';

import { CurrentUserContext } from '../context/currentUser';
import useLocalStorage from '../hooks/useLocalStorage';

const Navbar = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const userImage =
    (currentUserState.isLoggedIn && currentUserState.currentUser.image) ||
    'https://static.productionready.io/images/smiley-cyrus.jpg';

  const [, setToken] = useLocalStorage('token');
  const [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false);

  const logout = event => {
    event.preventDefault();
    setToken('');
    dispatch({ type: 'SET_UNAUTHORIZED' });
    setIsSuccessfulLogout(true);
  };
  if (isSuccessfulLogout) return <Redirect to="/" />;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose" />
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a" />
                  &nbsp; Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUserState.currentUser.username}`}
                  className="nav-link"
                >
                  <img className="user-pic" src={userImage} alt="" />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger pull-xs-left"
                  onClick={logout}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn === false && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
