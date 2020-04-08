import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from '../Routes';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import SetToken from '../components/Auth/SetToken';
import LogOut from '../components/Auth/LogOut';
import ScrollToTop from './ScrollToTop';
import Profile from '../pages/Profile';
import SearchPage from '../pages/Search';
import Earnings from '../pages/Earnings';

const Routes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={routes.AUTH} component={SetToken} />
        <Route exact path={routes.PROFILE} component={Profile} />
        <Route path={routes.SEARCH}>
          <SearchPage />
        </Route>
        <Route path={routes.FAQ}>
          <FAQ />
        </Route>
        <Route path={routes.EARNINGS}>
          <Earnings />
        </Route>
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
