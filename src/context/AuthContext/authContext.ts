/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  isVerified: true,
  loading: true,
  user: null,
  error: null,
  loadUser: () => {},
  logOut: () => {},
  setToken: (token: string) => token,
});

export default AuthContext;
