import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import AuthContext from '../../../context/AuthContext/authContext';
import * as routes from '../../../Routes';

interface Props {
  history: History;
}

const LogOutComponent: React.FC<Props> = (props: Props) => {
  const { history } = props;
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
    history.push(routes.HOME);
  }, [logOut, history]);

  return <p>Logging Out</p>;
};

export default withRouter(LogOutComponent);
