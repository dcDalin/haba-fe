import React, { useContext } from 'react';
import { Grid, Button, Icon, List } from 'semantic-ui-react';
import AuthModalContext from '../../context/AuthModalContext/authModalContext';
import AuthContext from '../../context/AuthContext/authContext';
import styles from './Home.module.scss';
import HomeComponent from '../../components/Home';
// @ts-ignore
import AdSense from 'react-adsense';
import CarouselInfo from '../../components/Home/CarouselInfo';

const Home: React.FC = () => {
  const { openSignUpModal } = useContext(AuthModalContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = (): any => {
    openSignUpModal();
  };
  return (
    <Grid divided="vertically" stackable className={styles.homeWrapper}>
      <Grid.Row columns={2}>
        <Grid.Column width={6}>
          <div className={styles.topWrapper}>
            <h1 className={styles.title}>Haba?</h1>
            <h1 className={styles.desc}>A way to express love and appreciation.</h1>

            {!isAuthenticated && (
              <Button icon basic labelPosition="right" size="big" className={styles.callToAction} onClick={handleClick}>
                Start my page
                <Icon name="money" />
              </Button>
            )}
          </div>
          <hr className={styles.hr} />
          <CarouselInfo />
          <AdSense.Google client="ca-pub-2361896733949876" slot="7806394673" />
          <div className={styles.info}>
            <List>
              <List.Item>
                <List.Icon name="users" />
                <List.Content>Lynzi Ltd</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="marker" />
                <List.Content>Nairobi, Kenya</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="admin:info@slynzi">info@lynzi.com</a>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <HomeComponent />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;
