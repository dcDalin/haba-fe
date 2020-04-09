import React from 'react';
import { Image, Loader } from 'semantic-ui-react';

interface Props {
  loading: boolean;
  username: string;
}
const DropDownTrigger: React.FC<Props> = (props: Props) => {
  const { loading, username } = props;

  const url = null;

  return (
    <span>
      <Image avatar src={url} />
      {username}
      <Loader active={loading} size="tiny" />
    </span>
  );
};

export default DropDownTrigger;
