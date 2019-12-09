import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/currentUser';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [{ response }, doFetch] = useFetch('/user');
  const [token] = useLocalStorage('token');
  console.log(response);

  useEffect(() => {
    if (!token) {
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false
      }));
    }
    doFetch();
    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }));
  }, [doFetch, setCurrentUserState, token]);

  useEffect(() => {
    if (!response) return;
    setCurrentUserState(state => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user
    }));
  }, [response, setCurrentUserState]);

  return children;
};

export default CurrentUserChecker;
