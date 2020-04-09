import React, { useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import MobileLoggedInNavBar from '../NavBar/MobileLoggedInNavBar';
import MobileLoggedOutNavBar from '../NavBar/MobileLoggedOutNavBar';
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
    menuBar = (
      <MobileLoggedInNavBar>
        <Container>
          {children}
          <div style={{ paddingBottom: '80px' }}></div>
        </Container>
      </MobileLoggedInNavBar>
    );
  } else {
    menuBar = (
      <MobileLoggedOutNavBar>
        <Container>{children}</Container>
        <div style={{ paddingBottom: '80px' }}></div>
      </MobileLoggedOutNavBar>
    );
  }

  return menuBar;
};

export default DesktopContainer;
