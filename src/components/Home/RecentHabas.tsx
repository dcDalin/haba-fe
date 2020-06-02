import React from 'react';
import { Link } from 'react-router-dom';
import { Comment, Header } from 'semantic-ui-react';
import { GET_RECENT_HABAS } from '../../GraphQl/Queries/Haba';
import { useQuery } from '@apollo/react-hooks';
import styles from './Home.module.scss';

const RecentHabas: React.FC = () => {
  const { loading, error, data } = useQuery(GET_RECENT_HABAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const habas = data.haba_recentHabas.map((haba: any) => {
    console.log(haba);
    return (
      <Comment key={haba.id} className={styles.featured}>
        <Comment.Content>
          <Comment.Author as="a">{haba.fromName}</Comment.Author>
          &nbsp; did a <span>{haba.fromAmount}</span> HABA on{' '}
          <Link to={`${haba.user.userName}`}>{haba.user.userName}'s</Link> account.
          <Comment.Metadata>
            <span>{haba.fromNow}</span>
          </Comment.Metadata>
        </Comment.Content>

        {haba.reply && (
          <Comment.Group>
            <Comment>
              <Comment.Avatar as="a" src={haba.user.profileUrl} />
              <Comment.Content>
                <Comment.Author as={Link} to={`${haba.user.userName}`}>
                  {haba.user.userName}
                </Comment.Author>
                <Comment.Metadata>
                  <span>{haba.fromUpdate}</span>
                </Comment.Metadata>
                <Comment.Text>{haba.reply}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        )}
      </Comment>
    );
  });

  return (
    <Comment.Group size="big">
      <h2 className={styles.dashHeading}>Recent Habas</h2>

      {habas}
    </Comment.Group>
  );
};

export default RecentHabas;
