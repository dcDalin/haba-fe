import React, { useContext, useEffect } from 'react';
import DesktopLoggedInNavBar from '../NavBar/DesktopLoggedInNavBar';
import DesktopLoggedOutNavBar from '../NavBar/DesktopLoggedOutNavBar';
import AuthContext from '../../context/AuthContext/authContext';

const DesktopContainer: React.FC = props => {
  const { children } = props;
  const { isAuthenticated, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);
  let menuBar;
  if (isAuthenticated) {
    menuBar = <DesktopLoggedInNavBar>{children}</DesktopLoggedInNavBar>;
  } else {
    menuBar = <DesktopLoggedOutNavBar>{children}</DesktopLoggedOutNavBar>;
  }

  return menuBar;
};

export default DesktopContainer;
