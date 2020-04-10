import React from 'react';
import { Image, Loader } from 'semantic-ui-react';

interface Props {
  loading: boolean;
  username: string;
  profileUrl: string;
}
const DropDownTrigger: React.FC<Props> = (props: Props) => {
  const { loading, username, profileUrl } = props;

  return (
    <span>
      <Image avatar src={profileUrl} />
      {username}
      <Loader active={loading} size="tiny" />
    </span>
  );
};

export default DropDownTrigger;
