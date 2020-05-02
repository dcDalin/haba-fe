/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_RESET_PASS_MODAL,
  CLOSE_RESET_PASS_MODAL,
  OPEN_RESET_CODE_MODAL,
  CLOSE_RESET_CODE_MODAL,
  OPEN_NEW_PASS_MODAL,
  CLOSE_NEW_PASS_MODAL,
} from './types';

export default (state: any, { type }: any): any => {
  switch (type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isLoginOpen: true,
        isSignUpOpen: false,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: false,
      };
    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: true,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: false,
      };
    // first modal
    case OPEN_RESET_PASS_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isResetOpen: true,
        isCodeOpen: false,
        isNewPassOpen: false,
      };
    case OPEN_RESET_CODE_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isResetOpen: false,
        isCodeOpen: true,
        isNewPassOpen: false,
      };
    case OPEN_NEW_PASS_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isResetOpen: false,
        isCodeOpen: false,
        isNewPassOpen: true,
      };

    case CLOSE_LOGIN_MODAL:
    case CLOSE_SIGNUP_MODAL:
    case CLOSE_RESET_PASS_MODAL:
    case CLOSE_RESET_CODE_MODAL:
    case CLOSE_NEW_PASS_MODAL:
      return {
        ...state,
        isLoginOpen: false,
        isSignUpOpen: false,
        isResetOpen: false,
      };
    default:
      return state;
  }
};
