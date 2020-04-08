import React from 'react';
import { Router } from 'react-router-dom';
import history from '../history';
import AuthState from '../context/AuthContext/authState';
import ActiveNavState from '../context/ActiveNavContext/activeNavState';
import ResponsiveContainer from '../components/ResponsiveContainer';
import Routes from './Routes';
import FullPageLoader from '../components/Loaders/fullPageLoader';

const App: React.FC = () => {
  return (
    <AuthState>
      <FullPageLoader />
      <Router history={history}>
        <ActiveNavState>
          <ResponsiveContainer>
            <Routes />
          </ResponsiveContainer>
        </ActiveNavState>
      </Router>
    </AuthState>
  );
};

export default App;
