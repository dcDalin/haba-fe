import gql from 'graphql-tag';

const NEW_EARNINGS_SUBSCRIPTION = gql`
  subscription Earnings_transactonChange {
    earnings_transactonChange {
      netIncome
      withdrawn
      availableForWithdrawal
      earnings {
        id
        date
        transactionType
        amount
        serviceFee
        balance
      }
    }
  }
`;

export { NEW_EARNINGS_SUBSCRIPTION };
