import gql from 'graphql-tag';

const USER_EARNINGS = gql`
  query Earnings_userEarnings($type: String!, $year: String, $month: String, $cursor: String, $limit: Int) {
    earnings_userEarnings(type: $type, year: $year, month: $month, cursor: $cursor, limit: $limit) {
      hasNextPage
      endCursor
      netIncome
      withdrawn
      availableForWithdrawal
      earnings {
        id
        createdAt
        transactionType
        amount
        serviceFee
        balance
        date
      }
    }
  }
`;

export { USER_EARNINGS };
