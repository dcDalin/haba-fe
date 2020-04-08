import React, { useContext, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import AuthContext from '../../context/AuthContext/authContext';
import './loader.css';

const FullPageLoader: React.FC = () => {
  const { loadUser, loading } = useContext(AuthContext);
  console.log('Loading here is: ', loading);
  useEffect(() => {
    loadUser();
  }, []);

  let fullLoader;
  if (loading) {
    fullLoader = (
      <div className="custom-spinner-wrapper">
        <Loader active inline="centered" className="custom-loading-spinner" size="huge" />
      </div>
    );
  } else {
    fullLoader = null;
  }
  return fullLoader;
};

export default FullPageLoader;
