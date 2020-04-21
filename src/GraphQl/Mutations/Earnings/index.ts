import gql from 'graphql-tag';

const INITIATE_MPESA_WITHDRAWAL = gql`
  mutation Earnings_initiateMpesaWithdrawal($amount: Float!) {
    earnings_initiateMpesaWithdrawal(amount: $amount) {
      status
      message
    }
  }
`;

export { INITIATE_MPESA_WITHDRAWAL };
