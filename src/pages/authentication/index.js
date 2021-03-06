import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../context/currentUser';
import BackendErrorMessages from '../../components/backendErrorMessages';

const Authentication = props => {
  //Log In/Sign up page conditions
  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : '/login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiUrl = isLogin ? '/users/login' : '/users';
  const [submitted, setSubmitted] = useState(false);
  //Default states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  //Custom Hooks
  const [{ isLoading, error, response }, doFetch] = useFetch(apiUrl);
  console.log('useFetch', isLoading, error, response);
  const [token, setToken] = useLocalStorage('token');
  console.log('token', token);
  const [, dispatch] = useContext(CurrentUserContext);

  const handleSubmit = event => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { username, email, password };
    doFetch({
      method: 'post',
      data: {
        user
      }
    });
  };

  useEffect(() => {
    if (!response) return;
    setToken(response.user.token);
    setSubmitted(true);
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, setToken, dispatch]);

  if (submitted) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>

            {error && <BackendErrorMessages backendErrors={error.errors} />}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={isLoading}
              >
                {pageTitle}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
