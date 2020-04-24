/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { List, Image } from 'semantic-ui-react';
import * as routes from '../../Routes';
import { FEATURED_USERS } from '../../GraphQl/Queries/Auth';
import styles from './Home.module.scss';

const FeaturedUsers: React.FC = () => {
  const { loading, error, data } = useQuery(FEATURED_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const { user_featuredUsers } = data;

  let featuredCreators;

  if (Array.isArray(user_featuredUsers) && user_featuredUsers.length) {
    featuredCreators = user_featuredUsers.map((post: any, i: any) => (
      <List.Item
        key={post.userName}
        as={Link}
        to={`${routes.HOME}${post.userName}`}
        className={styles.featuredListItem}
      >
        <Image avatar src={post.profileUrl} />
        <List.Content>
          <List.Header>{post.userName}</List.Header>
          <List.Description className={styles.bio}>{post.bio}</List.Description>
        </List.Content>
      </List.Item>
    ));
  } else {
    featuredCreators = (
      <List.Item>
        <List.Content>
          <List.Description className={styles.bio}>No featured creators</List.Description>
        </List.Content>
      </List.Item>
    );
  }
  return (
    <>
      <h1 className={styles.dashHeading}>Featured Creators</h1>

      <List animated verticalAlign="middle" size="massive" className={styles.featured}>
        {featuredCreators}
      </List>
    </>
  );
};

export default FeaturedUsers;
