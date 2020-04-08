import React from 'react';
import { Menu } from 'semantic-ui-react';
import styles from './MobileSearch.module.scss';
import SearchComponent from './SearchComponent';

const MobileSearchNav: React.FC = () => {
  return (
    <Menu fixed="top" secondary size="huge" className={styles.mobileMenu}>
      <Menu.Item position="left">some</Menu.Item>
      <Menu.Item position="right" className={styles.searchWrapper}>
        <SearchComponent />
      </Menu.Item>
    </Menu>
  );
};

export default MobileSearchNav;
