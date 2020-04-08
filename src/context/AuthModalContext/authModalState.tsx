import React, { useReducer } from 'react';
import AuthModalReducer from './authModalReducer';
import AuthModalContext from './authModalContext';
import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_CHOOSE_SIGNUP_MODAL,
  CLOSE_CHOOSE_SIGNUP_MODAL,
} from './types';

interface AuthModalStateProps {
  children?: React.ReactNode;
}

interface FuncResult {
  isLoginOpen: boolean | null;
  isSignUpOpen: boolean | null;
  isChooseSignUpOpen: boolean | null;
}

const AuthModalState: React.FC = (props: AuthModalStateProps) => {
  const { children } = props;

  const intialState: FuncResult = {
    isLoginOpen: false,
    isSignUpOpen: false,
    isChooseSignUpOpen: false,
  };

  const [state, dispatch] = useReducer(AuthModalReducer, intialState);

  const openLoginModal = (): any => dispatch({ type: OPEN_LOGIN_MODAL });
  const closeLoginModal = (): any => dispatch({ type: CLOSE_LOGIN_MODAL });
  const openSignUpModal = (): any => dispatch({ type: OPEN_SIGNUP_MODAL });
  const closeSignUpModal = (): any => dispatch({ type: CLOSE_SIGNUP_MODAL });
  const openChooseSignupModal = (): any => dispatch({ type: OPEN_CHOOSE_SIGNUP_MODAL });
  const closeChooseSignUpModal = (): any => dispatch({ type: CLOSE_CHOOSE_SIGNUP_MODAL });

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen: state.isLoginOpen,
        isSignUpOpen: state.isSignUpOpen,
        isChooseSignUpOpen: state.isChooseSignUpOpen,
        openLoginModal,
        closeLoginModal,
        openSignUpModal,
        closeSignUpModal,
        openChooseSignupModal,
        closeChooseSignUpModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalState;
