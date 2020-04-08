import gql from 'graphql-tag';

const USER_SIGN_UP = gql`
  mutation User_signUp($userName: String!, $email: String!, $password: String!) {
    user_signUp(userSignUpInput: { userName: $userName, email: $email, password: $password }) {
      token
    }
  }
`;

const USER_SIGN_IN = gql`
  mutation User_signIn($email: String!, $password: String!) {
    user_signIn(userSignInInput: { email: $email, password: $password }) {
      token
    }
  }
`;

const UPDATE_PROFILE_PIC = gql`
  mutation UserUpdateProfilePicture($file: Upload!) {
    userUpdateProfilePicture(file: $file) {
      id
      username
      displayName
      email {
        emailAddress
        isVerified
      }
      profile {
        picture {
          public_id
          url
        }
        phone {
          phoneNumber
          isVerified
        }
        accountType
      }
    }
  }
`;

export { USER_SIGN_UP, USER_SIGN_IN, UPDATE_PROFILE_PIC };
