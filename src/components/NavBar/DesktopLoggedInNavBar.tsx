import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu, Container } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import * as routes from '../../Routes';
import Search from '../Search';
import UserAvatarDropdown from './UserAvatarDropdown';
import styles from './NavBar.module.scss';

export interface Props {
  children: React.ReactNode;
}

const DesktopLoggedOutNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Responsive as={Container} getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Menu fixed="top" secondary className={styles.menu}>
        <Container>
          <Menu.Item style={{ marginLeft: '0px', paddingLeft: '0px' }}>
            <Menu.Item
              as={Link}
              to={routes.HOME}
              className={styles.menuItem}
              style={{ marginLeft: '0px', paddingLeft: '0px' }}
            >
              <span className={styles.logoText}>gohaba</span>
            </Menu.Item>
          </Menu.Item>
          <Menu.Item>
            <Search />
          </Menu.Item>
          <Menu.Item position="right" style={{ marginRight: '0px', paddingRight: '0px' }}>
            <Menu.Item className={styles.menuItem} style={{ marginRight: '0px', paddingRight: '0px' }}>
              <UserAvatarDropdown />
            </Menu.Item>
          </Menu.Item>
        </Container>
      </Menu>
      <div style={{ marginTop: '67px' }}>{children}</div>
    </Responsive>
  );
};

export default DesktopLoggedOutNavBar;
