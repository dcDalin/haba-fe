/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import authReducer from './authReducer';
import AuthContext from './authContext';
import { AUTH_ERROR, USER_LOGOUT, USER_LOADED, SET_TOKEN } from './types';
import { jwtTitle } from '../../constants';
import { WHO_IS_ME } from '../../GraphQl/Queries/Auth';

interface AuthStateProps {
  children?: React.ReactNode;
}

interface FuncResult {
  token: string | null;
  isAuthenticated: boolean | null;
  isVerified: boolean | null;
  user: object | null;
  loading: boolean;
  error: any;
}

const AuthState: React.FC = (props: AuthStateProps) => {
  const { children } = props;

  const initialState: FuncResult = {
    token: localStorage.getItem(jwtTitle),
    isAuthenticated: null,
    isVerified: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const client = useApolloClient();

  // Logout
  const logOut = (): any => {
    dispatch({ type: USER_LOGOUT });
    client.cache.reset();
  };

  // Load User
  const loadUser = async (): Promise<any> => {
    try {
      const res = await client.query({ query: WHO_IS_ME, fetchPolicy: 'network-only' });
      dispatch({
        type: USER_LOADED,
        payload: res.data.user_me,
        loadPayload: res.loading,
        isVerifiedPayload: res.data.user_me.isVerified,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Set OAuth Token
  function setToken(token: string): any {
    localStorage.setItem(jwtTitle, token);

    dispatch({
      type: SET_TOKEN,
    });
    loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        logOut,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
