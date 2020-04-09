/* eslint-disable react/display-name */
import React, { createRef, useContext, useState } from 'react';
import { Grid, Ref, Sticky, Responsive, Tab, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { USER_PROFILE } from '../../GraphQl/Queries/Auth';
import HabaState from '../../context/HabaContext/habaState';
import FeedWrapper from '../../components/Feed';
import TopProfile from '../../components/TopProfile';
import SingleHaba from '../../Forms/SingleHaba';
import FullPageLoader from '../../components/Loaders/fullPageLoader';
import getWidth from '../../utils/getWidth';
import styles from './Profile.module.scss';
import AuthContext from '../../context/AuthContext/authContext';

const Profile: React.FC = () => {
  const { userName }: any = useParams();

  const { user }: any = useContext(AuthContext);

  const { loading, error, data } = useQuery(USER_PROFILE, {
    variables: { userName },
  });

  const contextRef = createRef();

  if (loading) return <FullPageLoader />;

  if (error) return <p>User profile not found</p>;

  // Get user id from USER_PROFILE query
  const { id } = data.user_profile.user;

  // Get id from logged in user context
  const authId = user.id;

  const panes = [
    {
      menuItem: 'Haba',
      render: (): any => (
        <Tab.Pane attached={false} className={styles.tab}>
          <SingleHaba userName={userName} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'View Habas',
      render: (): any => (
        <Tab.Pane attached={false} className={styles.tab}>
          <FeedWrapper userId={id} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <HabaState>
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} as={Grid} columns={2}>
        <Grid.Row>
          <TopProfile data={data} authId={authId} />
        </Grid.Row>
        <Ref innerRef={contextRef}>
          <Grid.Row>
            <Grid.Column>
              <Sticky context={contextRef} pushing offset={100}>
                <SingleHaba userName={userName} />
              </Sticky>
            </Grid.Column>
            <Grid.Column>
              <FeedWrapper userId={id} />
            </Grid.Column>
          </Grid.Row>
        </Ref>
      </Responsive>
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <TopProfile data={data} authId={authId} />
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Responsive>
    </HabaState>
  );
};

export default Profile;
