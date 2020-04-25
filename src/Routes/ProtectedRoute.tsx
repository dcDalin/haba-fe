/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from './index';

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: `${routes.HOME}` }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
