import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import UserArticles from '../../components/UserArticles';
import Following from '../../components/Following';

const UserProfile = ({ match, location }) => {
  const slug = match.params.slug;
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) return null;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={response.profile.image} className="user-img" alt="" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>

              <Following
                isFollowing={response.profile.following}
                profileUsername={response.profile.username}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profiles/${response.profile.username}`}
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profiles/${response.profile.username}/favorites`}
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>

            <UserArticles
              username={response.profile.username}
              location={location}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
