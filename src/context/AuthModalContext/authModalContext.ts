/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const AuthContext = createContext({
  isLoginOpen: false,
  isSignUpOpen: false,
  isChooseSignUpOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
  openSignUpModal: () => {},
  closeSignUpModal: () => {},
});

export default AuthContext;
