import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu, Icon } from 'semantic-ui-react';
import ActiveNavContext from '../../context/ActiveNavContext/activeNavContext';
import getWidth from '../../utils/getWidth';
import * as routes from '../../Routes';
import styles from './NavBar.module.scss';

const MobileFooterNav: React.FC = () => {
  const { activeItem, handleItemClick, visible } = useContext(ActiveNavContext);

  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu
        secondary
        icon="labeled"
        fluid
        widths={4}
        fixed="bottom"
        size="tiny"
        className={visible ? `${styles.hidden}` : `${styles.footerMenu}`}
      >
        <Menu.Item
          as={Link}
          to={routes.HOME}
          name="home"
          className={activeItem === 'home' ? `${styles.bNavActive}` : `${styles.bNav}`}
          onClick={handleItemClick}
        >
          <Icon name="home" className={styles.icon} />
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={routes.FAQ}
          name="faq"
          className={activeItem === 'faq' ? `${styles.bNavActive}` : `${styles.bNav}`}
          onClick={handleItemClick}
        >
          <Icon name="bus" className={styles.icon} />
          FAQ
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={routes.SEARCH}
          name="search"
          className={activeItem === 'search' ? `${styles.bNavActive}` : `${styles.bNav}`}
          onClick={handleItemClick}
        >
          <Icon name="search" className={styles.icon} />
          Search
        </Menu.Item>
      </Menu>
    </Responsive>
  );
};

export default MobileFooterNav;
