import React from 'react';
import useFetch from '../hooks/useFetch';

const Following = ({ isFollowing, profileUsername }) => {
  const apiUrl = `/profiles/${profileUsername}/follow`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  const isFollowingWithResponse = response
    ? response.profile.following
    : isFollowing;

  const handleClick = event => {
    event.preventDefault();
    doFetch({
      method: isFollowingWithResponse ? 'delete' : 'post'
    });
  };

  return (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={handleClick}
    >
      <i className="ion-plus-round"></i>
      &nbsp;{' '}
      {isFollowingWithResponse
        ? `UnFollowing ${profileUsername}`
        : `Follow ${profileUsername}`}
    </button>
  );
};

export default Following;
