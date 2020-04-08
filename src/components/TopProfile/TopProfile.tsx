import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import styles from './TopProfile.module.scss';

interface Props {
  data: {
    user_profile: any;
  };
}

const TopProfile: React.FC<Props> = (props: Props) => {
  const { userName, bio } = props.data.user_profile.user;
  return (
    <Grid className={styles.wrapper}>
      <Grid.Column floated="left" width={3}>
        <Image src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" size="big" circular />
      </Grid.Column>
      <Grid.Column floated="right" width={13}>
        <Header as="h2">{userName}</Header>
        <p>{bio}</p>
      </Grid.Column>
    </Grid>
  );
};

export default TopProfile;
