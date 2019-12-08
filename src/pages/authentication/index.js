import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ isLoading, error, response }, doFetch] = useFetch('/users/login');
  console.log('useFetch', isLoading, error, response);

  const handleSubmit = event => {
    event.preventDefault();

    doFetch({
      method: 'post',
      data: {
        user: {
          email: 'qq@qq.com',
          password: '123'
        }
      }
    });
    console.log('values', email, password);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="/signup">Need an account?</Link>
            </p>

            {/* <ul className="error-messages">
              <li>That email is already taken</li>
            </ul> */}

            <form onSubmit={handleSubmit}>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
