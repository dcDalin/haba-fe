/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_EARNINGS } from '../../GraphQl/Queries/Earnings';
import styles from './Earnings.module.scss';
import EarningsSummary from './EarningsSummary';
import EarningsTable from './EarningsTable';
import FullPageLoader from '../Loaders/fullPageLoader';
import { NEW_EARNINGS_SUBSCRIPTION } from '../../GraphQl/Subscriptions/Earnings';
import MpesaWithdrawalModal from './MpesaWithdrawalModal';

const Earnings: React.FC = () => {
  const { loading, error, data, fetchMore, subscribeToMore } = useQuery(USER_EARNINGS, {
    variables: { type: '', year: '', month: '', cursor: '', limit: 10 },
  });

  const subscribeToEarnings = (): any => {
    subscribeToMore({
      document: NEW_EARNINGS_SUBSCRIPTION,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return previousResult;
        }

        const { earnings_transactonChange } = subscriptionData.data;

        const { netIncome, withdrawn, availableForWithdrawal } = earnings_transactonChange;
        const newSummary = {
          netIncome,
          withdrawn,
          availableForWithdrawal,
        };

        return {
          earnings_userEarnings: {
            ...previousResult.earnings_userEarnings,
            ...newSummary,
            earnings: [...[earnings_transactonChange.earnings], ...previousResult.earnings_userEarnings.earnings],
          },
        };
      },
    });
  };

  useEffect(() => {
    subscribeToEarnings();
  }, []);

  if (loading) return <FullPageLoader />;

  if (error) return <p>An unknown error occured</p>;

  const { netIncome, withdrawn, availableForWithdrawal, endCursor, earnings, hasNextPage } = data.earnings_userEarnings;

  const loadMoreEarnings: any = () => {
    fetchMore({
      // note this is a different query than the one used in the
      // Query component
      query: USER_EARNINGS,
      variables: { type: '', year: '', month: '', cursor: endCursor, limit: 10 },

      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        console.log('Previous res: ', previousResult);
        const previousEntry = previousResult.earnings_userEarnings;
        const newEarnings = fetchMoreResult.earnings_userEarnings.earnings;
        const newCursor = fetchMoreResult.earnings_userEarnings.endCursor;
        const newHasMore = fetchMoreResult.earnings_userEarnings.hasNextPage;

        return {
          // eslint-disable-next-line @typescript-eslint/camelcase
          earnings_userEarnings: {
            endCursor: newCursor,
            hasNextPage: newHasMore,
            earnings: [...previousEntry.earnings, ...newEarnings],

            __typename: previousEntry.__typename,
          },
        };
      },
    });
  };

  return (
    <>
      <h2 className={styles.dashHeading}>Earnings</h2>
      <MpesaWithdrawalModal />
      <EarningsSummary netIncome={netIncome} withdrawn={withdrawn} availableForWithdrawal={availableForWithdrawal} />

      <EarningsTable hasNextPage={hasNextPage} loadMoreEarnings={loadMoreEarnings} earnings={earnings} />
    </>
  );
};

export default Earnings;
