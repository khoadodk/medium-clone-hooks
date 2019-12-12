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

const TagFeed = ({ location, match }) => {
  const tagName = match.params.slug;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  });
  const currentUrl = match.url;
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch, tagName]);

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
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

export default TagFeed;
