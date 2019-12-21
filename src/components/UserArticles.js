import React, { useEffect } from 'react';
import { getPaginator, limit } from '../utils';
import useFetch from '../hooks/useFetch';
import { stringify } from 'query-string';

import Loading from '../components/Loading';
import Error from '../components/Error';
import Pagination from '../components/Pagination';
import Feed from '../components/Feed';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, url }) => {
  const isFavorites = location.pathname.includes('favorites');
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <Error />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={location.pathname}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};
export default UserArticles;
