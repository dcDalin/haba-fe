import gql from 'graphql-tag';

const USER_SIGN_UP = gql`
  mutation User_signUp($userName: String!, $phoneNumber: String!, $password: String!) {
    user_signUp(userSignUpInput: { userName: $userName, phoneNumber: $phoneNumber, password: $password }) {
      token
    }
  }
`;

const USER_SIGN_IN = gql`
  mutation User_signIn($phoneNumber: String!, $password: String!) {
    user_signIn(userSignInInput: { phoneNumber: $phoneNumber, password: $password }) {
      token
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation User_updateProfile($phoneNumberNew: String!, $bio: String!, $userName: String!, $displayName: String!) {
    user_updateProfile(
      userUpdateInput: { phoneNumberNew: $phoneNumberNew, bio: $bio, userName: $userName, displayName: $displayName }
    )
  }
`;

export { USER_SIGN_UP, USER_SIGN_IN, UPDATE_PROFILE };
