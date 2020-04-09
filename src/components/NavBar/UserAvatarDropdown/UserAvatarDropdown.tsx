import React, { useContext, useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext/authContext';
import * as routes from '../../../Routes';
import DropDownTrigger from './DropDownTrigger';
import styles from './DropDown.module.scss';
import { WHO_IS_ME } from '../../../GraphQl/Queries/Auth';
import { useQuery } from '@apollo/react-hooks';

const UserAvatarDropdown: React.FC = () => {
  const { loading, data } = useQuery(WHO_IS_ME);
  const { userName, displayName } = data.user_me;
  const url = null;

  const showName = userName ? userName : displayName;

  return (
    <Dropdown trigger={<DropDownTrigger loading={loading} username={showName} />} className={styles.dropDown}>
      <Dropdown.Menu direction="left" className={styles.dropDownMenu}>
        <Dropdown.Header content={showName} />
        <Dropdown.Item text="Earnings" as={Link} to={routes.EARNINGS} className={styles.dropDownMenuItem} />
        <Dropdown.Item text="My Profile" as={Link} to={`/${showName}`} className={styles.dropDownMenuItem} />
        <Dropdown.Divider />
        <Dropdown.Item text="Log Out" as={Link} to={routes.LOGOUT} className={styles.dropDownMenuItem} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserAvatarDropdown;
