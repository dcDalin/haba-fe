import React, { useContext, useEffect } from 'react';
import DesktopLoggedInNavBar from '../NavBar/DesktopLoggedInNavBar';
import DesktopLoggedOutNavBar from '../NavBar/DesktopLoggedOutNavBar';
import AuthContext from '../../context/AuthContext/authContext';
import FullPageLoader from '../Loaders/fullPageLoader';

const DesktopContainer: React.FC = props => {
  const { children } = props;
  const { isAuthenticated, loadUser, loading } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);
  let menuBar;
  if (loading) {
    return <FullPageLoader />;
  } else if (isAuthenticated) {
    menuBar = <DesktopLoggedInNavBar>{children}</DesktopLoggedInNavBar>;
  } else {
    menuBar = <DesktopLoggedOutNavBar>{children}</DesktopLoggedOutNavBar>;
  }

  return menuBar;
};

export default DesktopContainer;
