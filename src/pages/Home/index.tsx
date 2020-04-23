import React, { useContext } from 'react';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';
import AuthModalContext from '../../context/AuthModalContext/authModalContext';
import HomeSvg from '../../assets/home.svg';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const { openSignUpModal } = useContext(AuthModalContext);

  const handleClick = (): any => {
    openSignUpModal();
  };
  return (
    <Grid divided="vertically" stackable className={styles.homeWrapper}>
      <Grid.Row columns={2}>
        <Grid.Column>
          <h1 className={styles.title}>Haba?</h1>
          <h1 className={styles.desc}>A way to express love and appreciation.</h1>

          <Button icon labelPosition="right" size="massive" className={styles.callToAction} onClick={handleClick}>
            Start my page
            <Icon name="money" />
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Image src={HomeSvg} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
