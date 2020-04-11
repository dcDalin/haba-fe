import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import styles from './TopProfile.module.scss';
import EditProfileModal from './EditProfileModal';

interface Props {
  data: {
    user_profile: any;
  };
  authId: number;
}

const TopProfile: React.FC<Props> = (props: Props) => {
  const { id, userName, displayName, bio, profileUrl, phoneNumber } = props.data.user_profile.user;
  const { authId } = props;

  console.log('Data is: ', props.data.user_profile.user);
  return (
    <Grid className={styles.wrapper} container stackable centered>
      <Grid.Column width={3}>
        <div className={styles.leftWrap}>
          <Image src={profileUrl} size="small" circular className={styles.profileImage} />
          <h1 className={styles.userName}>{userName}</h1>
        </div>
      </Grid.Column>
      <Grid.Column floated="right" width={10}>
        <p className={styles.bio}>{bio}</p>
      </Grid.Column>
      <Grid.Column floated="left" width={3}>
        {id === authId && (
          <EditProfileModal userName={userName} displayName={displayName} bio={bio} phoneNumber={phoneNumber} />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default TopProfile;
