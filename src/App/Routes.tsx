import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext/authContext';
import * as routes from '../Routes';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import SetToken from '../components/Auth/SetToken';
import LogOut from '../components/Auth/LogOut';
import ScrollToTop from './ScrollToTop';
import Profile from '../pages/Profile';
import Earnings from '../pages/Earnings';
import PrivateRoute from '../Routes/ProtectedRoute';

const Routes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={routes.AUTH} component={SetToken} />
        <Route exact path={routes.PROFILE} component={Profile} />
        <Route path={routes.FAQ}>
          <FAQ />
        </Route>
        <PrivateRoute path={routes.EARNINGS} isAuthenticated={isAuthenticated} component={Earnings} />

        <Route path={routes.LOGOUT}>
          <LogOut />
        </Route>
        <Route exact path={routes.HOME}>
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
