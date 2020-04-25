import React from 'react';
import { Loader, Segment, Dimmer, Image } from 'semantic-ui-react';
import styles from './Loader.module.scss';
import Logo from '../../assets/lynzi.jpeg';

const FullPageLoader: React.FC = () => (
  <Segment className={styles.segment}>
    <Dimmer active inverted className={styles.dimmer}>
      <Image src={Logo} size="tiny" className={styles.image} />
      <Loader active inline="centered" size="small">
        <p>Powered by Lynzi</p>
      </Loader>
    </Dimmer>
  </Segment>
);

export default FullPageLoader;
