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

const GET_RECENT_HABAS = gql`
  query Haba_recentHabas {
    haba_recentHabas {
      id
      fromName
      fromMessage
      fromAmount
      fromNow
      fromUpdate
      reply
      user {
        userName
        profileUrl
      }
    }
  }
`;

export { GET_USER_FEED, GET_RECENT_HABAS };
