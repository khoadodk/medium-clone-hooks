import React from 'react';
import useFetch from '../hooks/useFetch';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  const isLiked = isFavorited ? 'btn-primary' : 'btn-outline-primary';

  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const handleLike = event => {
    event.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post'
    });
  };

  return (
    <button className={`btn btn-sm ${isLiked}`} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorites;
