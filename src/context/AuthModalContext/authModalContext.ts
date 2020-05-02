/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const AuthContext = createContext({
  isLoginOpen: false,
  isSignUpOpen: false,
  isResetOpen: false,
  isCodeOpen: false,
  isNewPassOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  openSignUpModal: () => {},
  closeSignUpModal: () => {},
  openResetPassModal: () => {},
  closeResetPassModal: () => {},
  openCodeModal: () => {},
  closeCodeModal: () => {},
  openNewPassModal: () => {},
  closeNewPassModal: () => {},
});

export default AuthContext;
