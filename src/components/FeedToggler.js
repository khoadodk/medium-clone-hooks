import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Error from './Error';

import { CurrentUserContext } from '../context/currentUser';

const FeedToggler = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn ? (
          <li className="nav-item">
            <NavLink className="nav-link" to="/feed">
              Your Feed
            </NavLink>
          </li>
        ) : (
          <Error />
        )}

        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            Global Feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink className="nav-link active" to={`/tags/${tagName}`} exact>
              <i className="ion-pound"></i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggler;
