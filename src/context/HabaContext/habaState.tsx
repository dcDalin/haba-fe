/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import axios from 'axios';
import habaReducer from './habaReducer';
import HabaContext from './habaContext';
import { GET_USER_FEED } from '../../GraphQl/Queries/Haba';
import {
  FEED_LOADED,
  FEED_ERROR,
  STK_PUSH,
  SHOW_ERROR,
  STOP_LOADING,
  START_LOADING,
  SHOW_MESSAGE,
  RESET_STATE,
} from './types';

interface HabaStateProps {
  children?: React.ReactNode;
}

interface FuncResult {
  feed: object | null;
  loading: boolean;
  error: any;
  toastMsg: any;
}

const AuthState: React.FC = (props: HabaStateProps) => {
  const { children } = props;

  const intialState: FuncResult = {
    loading: false,
    feed: null,
    error: null,
    toastMsg: null,
  };

  const [state, dispatch] = useReducer(habaReducer, intialState);

  const client = useApolloClient();

  // Load Feed
  const loadFeed = async (userId: any): Promise<any> => {
    try {
      const res = await client.query({
        query: GET_USER_FEED,
        variables: { _id: userId },
      });

      dispatch({
        type: FEED_LOADED,
        payload: res.data.pay_getUserPayFeed.haba,
        loadPayload: res.loading,
      });
    } catch (err) {
      dispatch({
        type: FEED_ERROR,
      });
    }
  };

  // STK Push
  const stkPush = async (data: any): Promise<any> => {
    try {
      // Show loading  spinner as soon as user clicks haba
      dispatch({
        type: START_LOADING,
      });
      const { phoneNumber, payToUserName, amount, name, message, isPrivate } = data;

      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HABAHABA_URL}/pay/stk-pay`,
        data: {
          phoneNumber,
          payToUserName,
          amount,
          name,
          message,
          isPrivate,
        },
      });
      dispatch({
        type: STK_PUSH,
      });

      const { ResponseCode } = res.data;

      if (ResponseCode === '0') {
        dispatch({
          type: STOP_LOADING,
        });
        dispatch({
          type: SHOW_MESSAGE,
          payload: 'Enter MPesa pin on your phone',
        });
        dispatch({
          type: RESET_STATE,
        });
      } else {
        console.log('Res data cancelled is: ', res.data);
        dispatch({
          type: STOP_LOADING,
        });
        dispatch({
          type: SHOW_ERROR,
          payload: 'Sorry, something went wrong. Please try again.',
        });
        dispatch({
          type: RESET_STATE,
        });
      }
    } catch (err) {
      console.log('Error is: ', err);
      dispatch({
        type: SHOW_ERROR,
        payload: 'Could not initiate the payment process. Please try again.',
      });
      dispatch({
        type: RESET_STATE,
      });
    }
  };

  return (
    <HabaContext.Provider
      value={{
        loading: state.loading,
        feed: state.feed,
        loadFeed,
        stkPush,
        error: state.error,
        toastMsg: state.toastMsg,
      }}
    >
      {children}
    </HabaContext.Provider>
  );
};

export default AuthState;
