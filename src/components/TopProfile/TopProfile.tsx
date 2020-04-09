import React from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import styles from './TopProfile.module.scss';

interface Props {
  data: {
    user_profile: any;
  };
  authId: number;
}

const TopProfile: React.FC<Props> = (props: Props) => {
  const { id, userName, bio } = props.data.user_profile.user;
  const { authId } = props;

  return (
    <Grid className={styles.wrapper} container stackable centered>
      <Grid.Column width={3}>
        <div className={styles.leftWrap}>
          <Image
            src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
            size="small"
            circular
            className={styles.profileImage}
          />
          <h1 className={styles.userName}>{userName}</h1>
        </div>
      </Grid.Column>
      <Grid.Column floated="right" width={10}>
        <p className={styles.bio}>{bio}</p>
      </Grid.Column>
      <Grid.Column floated="left" width={3}>
        {id === authId && (
          <Button icon basic>
            <Icon name="edit" />
          </Button>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default TopProfile;
