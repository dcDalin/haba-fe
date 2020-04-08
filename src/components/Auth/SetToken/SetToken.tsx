import React, { useContext, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { History } from 'history';
import AuthContext from '../../../context/AuthContext/authContext';

interface Props {
  history: History;
}

const SetToken: React.FC<Props> = (props: Props) => {
  const { id } = useParams();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setToken(id);
      props.history.push('/');
    }
  }, [id, setToken, props.history]);

  return <h2>An unknown error occured</h2>;
};

export default withRouter(SetToken);
