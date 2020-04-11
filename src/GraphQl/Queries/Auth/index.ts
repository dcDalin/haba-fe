import gql from 'graphql-tag';

const WHO_IS_ME = gql`
  query User_me {
    user_me {
      id
      userName
      displayName
      phoneNumber
      profileUrl
      bio
    }
  }
`;

const SEARCH_USERS = gql`
  query User_searchUserName($userName: String!) {
    user_searchUserName(userName: $userName) {
      id
      userName
      displayName
      profileUrl
    }
  }
`;

const CHECK_PHONE_NUMBER_EXISTS = gql`
  query User_userPhoneNumberExists($phoneNumber: String!) {
    user_userPhoneNumberExists(phoneNumber: $phoneNumber)
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
        bio
        profileUrl
        phoneNumber
      }
    }
  }
`;

const ALLOW_CHANGE_USERNAME = gql`
  query User_allowChangeUserName($newUserName: String!, $originalUserName: String!) {
    user_allowChangeUserName(newUserName: $newUserName, originalUserName: $originalUserName)
  }
`;

const ALLOW_CHANGE_PHONE_NUMBER = gql`
  query User_allowChangePhoneNumber($newPhoneNumber: String!, $originalPhoneNumber: String!) {
    user_allowChangePhoneNumber(newPhoneNumber: $newPhoneNumber, originalPhoneNumber: $originalPhoneNumber)
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

export {
  WHO_IS_ME,
  SEARCH_USERS,
  CHECK_PHONE_NUMBER_EXISTS,
  CHECK_USERNAME_EXISTS,
  USER_PROFILE,
  USER_HABAS,
  ALLOW_CHANGE_USERNAME,
  ALLOW_CHANGE_PHONE_NUMBER,
};
