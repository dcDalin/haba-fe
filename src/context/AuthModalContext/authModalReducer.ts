/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_CHOOSE_SIGNUP_MODAL,
  CLOSE_CHOOSE_SIGNUP_MODAL,
} from './types';

export default (state: any, { type }: any): any => {
  switch (type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isLoginOpen: true,
        isSignUpOpen: false,
        isChooseSignUpOpen: false,
      };
    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: true,
        isChooseSignUpOpen: false,
      };
    case OPEN_CHOOSE_SIGNUP_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isChooseSignUpOpen: true,
      };
    case CLOSE_LOGIN_MODAL:
    case CLOSE_SIGNUP_MODAL:
    case CLOSE_CHOOSE_SIGNUP_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isChooseSignUpOpen: false,
      };
    default:
      return state;
  }
};
