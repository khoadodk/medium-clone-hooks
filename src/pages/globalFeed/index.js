import React, { useEffect } from 'react';
import Feed from '../../components/Feed';
import useFetch from '../../hooks/useFetch';

const GlobalFeed = () => {
  const apiUrl = '/articles?limit=10&offset=0';
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  console.log(response, error, isLoading);
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">Medium Clone</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
