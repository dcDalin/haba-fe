import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu, Image } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import ActiveNavContext from '../../context/ActiveNavContext/activeNavContext';
import * as routes from '../../Routes';
import MobileFooterNav from './MobileFooterNav';
import Search from '../Search';
import UserAvatarDropdown from './UserAvatarDropdown';
import styles from './NavBar.module.scss';
import PinkLogo from '../../assets/lynzi.png';

export interface Props {
  children: React.ReactNode;
}

const MobileLoggedInNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { activeItem, handleItemClick }: any = useContext(ActiveNavContext);

  return (
    <>
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Menu secondary className={styles.mobileMenu} size="large">
          <Menu.Item as={Link} to={routes.HOME} active={activeItem === 'home'} onClick={handleItemClick}>
            <img src={PinkLogo} alt="logo" width="100" />
          </Menu.Item>
          <Menu.Item style={{ padding: '0px' }}>
            <Search />
          </Menu.Item>
          <Menu.Item position="right" className={styles.menuItem}>
            <Menu.Item className={styles.menuItem} style={{ paddingRight: '0px', paddingLeft: '0px' }}>
              <UserAvatarDropdown />
            </Menu.Item>
          </Menu.Item>
        </Menu>
        <div style={{ marginTop: '48px' }}>{children}</div>
      </Responsive>
      <MobileFooterNav />
    </>
  );
};

export default MobileLoggedInNavBar;
