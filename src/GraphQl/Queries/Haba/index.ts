import gql from 'graphql-tag';

const GET_USER_FEED = gql`
  query Pay_getUserPayFeed($_id: ID!) {
    pay_getUserPayFeed(_id: $_id) {
      haba {
        id
        fromName
        fromMessage
        fromIsPrivate
        fromAmount
        createdAt
      }
    }
  }
`;

export { GET_USER_FEED };
