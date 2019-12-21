import React, { useState, useEffect, useContext } from 'react';

import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../context/currentUser';
import BackendErrorMessages from '../../components/backendErrorMessages';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [currentUserState, dispatch] = useContext(CurrentUserContext);

  const apiUrl = '/user';
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const handleSubmit = event => {
    event.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          bio,
          username,
          email,
          password
        }
      }
    });
  };

  useEffect(() => {
    if (!currentUserState.currentUser) return;

    const updatedUser = currentUserState.currentUser;
    setUsername(updatedUser.username);
    setImage(updatedUser.image);
    setBio(updatedUser.bio);
    setPassword(updatedUser.password);
    setEmail(updatedUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) return;
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={event => setImage(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    value={bio}
                    onChange={event => setBio(event.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
