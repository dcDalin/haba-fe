/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { jwtTitle } from '../../constants';

const AuthContext = createContext({
  token: localStorage.getItem(jwtTitle),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  loadUser: () => {},
  logOut: () => {},
  setToken: (token: string) => token,
});

export default AuthContext;
