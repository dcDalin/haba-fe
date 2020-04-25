import gql from 'graphql-tag';

const NEW_HABA_SUBSCRIPTION = gql`
  subscription Haba_subNewHaba($userId: String!) {
    haba_subNewHaba(userId: $userId) {
      id
      fromName
      fromName
      fromMessage
      fromIsPrivate
      fromAmount
      createdAt
      fromNow
    }
  }
`;

export { NEW_HABA_SUBSCRIPTION };
