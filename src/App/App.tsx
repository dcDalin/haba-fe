import React from 'react';
import { Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import history from '../history';
import AuthState from '../context/AuthContext/authState';
import ActiveNavState from '../context/ActiveNavContext/activeNavState';
import ResponsiveContainer from '../components/ResponsiveContainer';
import Routes from './Routes';

ReactGA.initialize('UA-166917981-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  return (
    <AuthState>
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
