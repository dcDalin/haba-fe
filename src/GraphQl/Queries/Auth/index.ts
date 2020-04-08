import gql from 'graphql-tag';

const WHO_IS_ME = gql`
  query User_me {
    user_me {
      id
      userName
      displayName
      email
    }
  }
`;

const SEARCH_USERS = gql`
  query User_searchUserName($userName: String!) {
    user_searchUserName(userName: $userName) {
      id
      userName
      displayName
    }
  }
`;

const CHECK_EMAIL_EXISTS = gql`
  query User_userEmailExists($email: String!) {
    user_userEmailExists(email: $email)
  }
`;

const CHECK_USERNAME_EXISTS = gql`
  query User_userNameExists($userName: String!) {
    user_userNameExists(userName: $userName)
  }
`;

const USER_PROFILE = gql`
  query User_profile($userName: String!) {
    user_profile(userName: $userName) {
      user {
        id
        userName
        displayName
      }
    }
  }
`;

const USER_HABAS = gql`
  query Haba_getUserPayFeed($userName: String!, $cursor: String, $limit: Int) {
    user_profile(userName: $userName, cursor: $cursor, limit: $limit) {
      hasNextPage
      endCursor
      haba {
        id
        fromName
        fromName
        fromMessage
        fromIsPrivate
        fromAmount
        createdAt
      }
    }
  }
`;

export { WHO_IS_ME, SEARCH_USERS, CHECK_EMAIL_EXISTS, CHECK_USERNAME_EXISTS, USER_PROFILE, USER_HABAS };
