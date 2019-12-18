import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../context/currentUser';

const CreateArticle = () => {
  const apiUrl = '/articles';
  const [submitted, setSubmitted] = useState(false);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  const onSubmit = article => {
    doFetch({
      method: 'post',
      data: {
        article
      }
    });
  };

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: ''
  };

  useEffect(() => {
    if (!response) return;
    setSubmitted(true);
  }, [response]);

  if (currentUserState.isLoggedIn === null) return null;

  if (submitted || currentUserState.isLoggedIn === false)
    return <Redirect to="/" />;

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;
