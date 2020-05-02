import React, { useReducer } from 'react';
import AuthModalReducer from './authModalReducer';
import AuthModalContext from './authModalContext';
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

interface AuthModalStateProps {
  children?: React.ReactNode;
}

interface FuncResult {
  isLoginOpen: boolean | null;
  isSignUpOpen: boolean | null;
  isResetOpen: boolean | null;
  isCodeOpen: boolean | null;
  isNewPassOpen: boolean | null;
}

const AuthModalState: React.FC = (props: AuthModalStateProps) => {
  const { children } = props;

  const intialState: FuncResult = {
    isLoginOpen: false,
    isSignUpOpen: false,
    isResetOpen: false,
    isCodeOpen: false,
    isNewPassOpen: false,
  };

  const [state, dispatch] = useReducer(AuthModalReducer, intialState);

  const openLoginModal = (): any => dispatch({ type: OPEN_LOGIN_MODAL });
  const closeLoginModal = (): any => dispatch({ type: CLOSE_LOGIN_MODAL });
  const openSignUpModal = (): any => dispatch({ type: OPEN_SIGNUP_MODAL });
  const closeSignUpModal = (): any => dispatch({ type: CLOSE_SIGNUP_MODAL });
  const openResetPassModal = (): any => dispatch({ type: OPEN_RESET_PASS_MODAL });
  const closeResetPassModal = (): any => dispatch({ type: CLOSE_RESET_PASS_MODAL });
  const openCodeModal = (): any => dispatch({ type: OPEN_RESET_CODE_MODAL });
  const closeCodeModal = (): any => dispatch({ type: CLOSE_RESET_CODE_MODAL });
  const openNewPassModal = (): any => dispatch({ type: OPEN_NEW_PASS_MODAL });
  const closeNewPassModal = (): any => dispatch({ type: CLOSE_NEW_PASS_MODAL });

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen: state.isLoginOpen,
        isSignUpOpen: state.isSignUpOpen,
        isResetOpen: state.isResetOpen,
        isCodeOpen: state.isCodeOpen,
        isNewPassOpen: state.isNewPassOpen,
        openLoginModal,
        closeLoginModal,
        openSignUpModal,
        closeSignUpModal,
        openResetPassModal,
        closeResetPassModal,
        openCodeModal,
        closeCodeModal,
        openNewPassModal,
        closeNewPassModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalState;
