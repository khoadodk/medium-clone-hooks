import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import TagList from '../../components/TagList';

const Article = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <Link to={`/profiles/${response.article.author.username}`}>
                {response.article.author.username}
              </Link>
              <span className="date">{response.article.createdAt}</span>
            </div>
          </div>
        )}
      </div>

      <div className="container page">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-md-12">
              <p>{response.article.body}</p>
            </div>
            <TagList tags={response.article.tagList} />
          </div>
        )}
      </div>

      <hr />
    </div>
  );
};

export default Article;
