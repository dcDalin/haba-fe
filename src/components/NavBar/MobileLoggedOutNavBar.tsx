import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import ActiveNavContext from '../../context/ActiveNavContext/activeNavContext';
import * as routes from '../../Routes';
import MobileFooterNav from './MobileFooterNav';
import LoginModal from '../Auth/Login';
import MobileSearchNav from '../Search/MobileSearchNav';
import styles from './NavBar.module.scss';

export interface Props {
  children: React.ReactNode;
}

const MobileLoggedOutNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { activeItem } = useContext(ActiveNavContext);

  let topNav;

  if (activeItem === 'search' || activeItem === 'p/search') {
    topNav = <MobileSearchNav />;
  } else {
    topNav = (
      <Menu fixed="top" secondary className={styles.mobileMenu} size="huge">
        <Menu.Item as={Link} to={routes.HOME}>
          <span className={styles.logoText}>HabaHaba</span>
        </Menu.Item>
        <Menu.Item position="right">
          <LoginModal />
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        {topNav}
        <div style={{ marginTop: '48px' }}>{children}</div>
      </Responsive>
      <MobileFooterNav />
    </>
  );
};

export default MobileLoggedOutNavBar;
