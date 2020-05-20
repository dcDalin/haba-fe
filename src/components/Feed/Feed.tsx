/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useContext } from 'react';
import { Comment, Segment, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { USER_HABAS } from '../../GraphQl/Queries/Auth';
import { NEW_HABA_SUBSCRIPTION } from '../../GraphQl/Subscriptions/Haba';
import { useQuery } from '@apollo/react-hooks';
import FeedPlaceholder from './FeedPlaceholder';
import styles from './Feed.module.scss';
import FeedCommentModal from './FeedCommentModal';
import AuthContext from '../../context/AuthContext/authContext';

interface Props {
  userId: string;
  profileUrl: string;
}

const Feed: React.FC<Props> = (props: Props) => {
  const { userName }: any = useParams();

  const { user }: any = useContext(AuthContext);

  const { userId, profileUrl } = props;

  const { loading, error, data, fetchMore, subscribeToMore } = useQuery(USER_HABAS, {
    variables: { userName, cursor: '', limit: 10 },
  });

  const subscribeToHabas = (): any => {
    subscribeToMore({
      document: NEW_HABA_SUBSCRIPTION,
      variables: { userId },
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { haba_subNewHaba } = subscriptionData.data;

        return {
          // subscription first to appear top of the list
          user_profile: {
            ...previousResult.user_profile,
            haba: [...[haba_subNewHaba], ...previousResult.user_profile.haba],
          },
        };
      },
    });
  };

  useEffect(() => {
    subscribeToHabas();
  }, []);

  if (loading) return <FeedPlaceholder />;

  if (error) return <p>User profile not found</p>;

  const { haba, hasNextPage, endCursor } = data.user_profile;

  const loadMoreHabas: any = () => {
    fetchMore({
      // note this is a different query than the one used in the
      // Query component
      query: USER_HABAS,
      variables: { userName, limit: 10, cursor: endCursor },

      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const previousEntry = previousResult.user_profile;
        const newHabas = fetchMoreResult.user_profile.haba;
        const newCursor = fetchMoreResult.user_profile.endCursor;
        const newHasMore = fetchMoreResult.user_profile.hasNextPage;

        return {
          // eslint-disable-next-line @typescript-eslint/camelcase
          user_profile: {
            endCursor: newCursor,
            hasNextPage: newHasMore,
            haba: [...previousEntry.haba, ...newHabas],

            __typename: previousEntry.__typename,
          },
        };
      },
    });
  };

  let userFeed;

  if (Array.isArray(haba) && haba.length) {
    userFeed = haba.map((post: any, i: any) => (
      <Comment.Group size="big" key={post.id}>
        <Comment>
          <Segment>
            <Comment.Content>
              <Comment.Author as="a">
                {post.fromName} did a {post.fromAmount} HABA on your account.
              </Comment.Author>

              <Comment.Text>{post.fromMessage}</Comment.Text>
              <Comment.Metadata>
                <span>{post.fromNow}</span>
              </Comment.Metadata>
            </Comment.Content>
            <Comment.Group>
              {post.reply && (
                <Comment>
                  <Comment.Avatar src={profileUrl} />
                  <Comment.Content className={styles.reply}>
                    <Comment.Author as="a">{userName}</Comment.Author>
                    <Comment.Metadata>
                      <div>{post.fromUpdate}</div>
                    </Comment.Metadata>
                    <Comment.Text>{post.reply}</Comment.Text>
                  </Comment.Content>
                </Comment>
              )}
            </Comment.Group>
            {user && user.id === userId && (
              <FeedCommentModal habaId={post.id} origReply={post.reply} userName={userName} />
            )}
          </Segment>
        </Comment>
      </Comment.Group>
    ));
  } else {
    userFeed = (
      <Comment.Group size="big">
        <Comment>
          <Segment>
            <Comment.Content>
              <Comment.Author as="a">No Habas done on my account yet</Comment.Author>
            </Comment.Content>
          </Segment>
        </Comment>
      </Comment.Group>
    );
  }

  return (
    <Comment.Group size="big">
      {userFeed}
      {hasNextPage && <Button onClick={loadMoreHabas}>{loading ? 'Loading...' : 'Load More'}</Button>}
    </Comment.Group>
  );
};

export default Feed;
