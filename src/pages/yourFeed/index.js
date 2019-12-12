import React, { useEffect } from 'react';
import { getPaginator, limit } from '../../utils';
import { stringify } from 'query-string';

import Feed from '../../components/Feed';
import useFetch from '../../hooks/useFetch';
import Pagination from '../../components/Pagination';
import PopularTags from '../../components/PopularTags';
import FeedToggler from '../../components/FeedToggler';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Banner from '../../components/Banner';

const YourFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset
  });
  const currentUrl = match.url;
  const apiUrl = `/articles/feed?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch]);

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <Error />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
