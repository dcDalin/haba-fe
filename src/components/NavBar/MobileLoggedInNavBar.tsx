import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu, Icon } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import ActiveNavContext from '../../context/ActiveNavContext/activeNavContext';
import * as routes from '../../Routes';
import MobileFooterNav from './MobileFooterNav';
import UserAvatarDropdown from './UserAvatarDropdown';
import MobileSearchNav from '../Search/MobileSearchNav';
import styles from './NavBar.module.scss';

export interface Props {
  children: React.ReactNode;
}

const MobileLoggedInNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { activeItem, handleItemClick }: any = useContext(ActiveNavContext);

  let topNav;

  if (activeItem === 'search' || activeItem === 'p/search') {
    topNav = <MobileSearchNav />;
  } else {
    topNav = (
      <Menu fixed="top" secondary className={styles.mobileMenu} size="huge">
        <Menu.Item as={Link} to={routes.HOME} active={activeItem === 'home'} onClick={handleItemClick}>
          <span className={styles.logoText}>HabaHaba</span>
        </Menu.Item>
        <Menu.Item position="right" className={styles.menuItem}>
          <Menu.Item className={styles.menuItem} style={{ paddingRight: '0px', paddingLeft: '0px' }}>
            <UserAvatarDropdown />
          </Menu.Item>
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

export default MobileLoggedInNavBar;
