import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Image, Loader } from 'semantic-ui-react';
import { WHO_IS_ME } from '../../../GraphQl/Queries/Auth';

const DropDownTrigger: React.FC = () => {
  const { loading, data } = useQuery(WHO_IS_ME);
  const { userName, displayName } = data.user_me;
  const url = null;
  const [username, setUsername] = useState();

  useEffect(() => {
    if (username) {
      setUsername(username);
    } else {
      setUsername(displayName);
    }
  }, [username]);

  return (
    <span>
      <Image avatar src={url} />
      {userName}
      <Loader active={loading} size="tiny" />
    </span>
  );
};

export default DropDownTrigger;
