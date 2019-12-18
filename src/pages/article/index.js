import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import TagList from '../../components/TagList';
import { CurrentUserContext } from '../../context/currentUser';

const Article = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleLoading
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDelete] = useFetch(apiUrl);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  // Edit Article
  const isAuthor = () => {
    if (currentUserState.isLoggedIn === null || !fetchArticleResponse)
      return false;
    return (
      currentUserState.currentUser.username ===
      fetchArticleResponse.article.author.username
    );
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  // Delete Article
  const deleteArticle = () => {
    doDelete({
      method: 'delete'
    });
  };

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) return <Redirect to="/" />;

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="ion-edit">Edit Article</i>
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a">Delete Article</i>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="container page">
        {fetchArticleLoading && <Loading />}
        {fetchArticleError && <Error />}
        {!fetchArticleLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-md-12">
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <TagList tags={fetchArticleResponse.article.tagList} />
          </div>
        )}
      </div>

      <hr />
    </div>
  );
};

export default Article;
