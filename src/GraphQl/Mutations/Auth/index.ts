import gql from 'graphql-tag';

const USER_SIGN_UP = gql`
  mutation User_signUp($userName: String!, $phoneNumber: String!, $password: String!) {
    user_signUp(userSignUpInput: { userName: $userName, phoneNumber: $phoneNumber, password: $password }) {
      token
      userName
    }
  }
`;

const USER_SIGN_IN = gql`
  mutation User_signIn($phoneNumber: String!, $password: String!) {
    user_signIn(userSignInInput: { phoneNumber: $phoneNumber, password: $password }) {
      token
      userName
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation User_updateProfile($bio: String!, $userName: String!, $displayName: String!) {
    user_updateProfile(userUpdateInput: { bio: $bio, userName: $userName, displayName: $displayName })
  }
`;

const UPDATE_PROFILE_PIC = gql`
  mutation User_updateProfilePicture($file: Upload!) {
    user_updateProfilePicture(file: $file)
  }
`;

const ENTER_VERIFICATION_CODE = gql`
  mutation User_enterVerificationCode($verificationCode: String!) {
    user_enterVerificationCode(verificationCode: $verificationCode)
  }
`;

const SEND_NEW_VERIFICATION_CODE = gql`
  mutation User_sendVerificationCode {
    user_sendVerificationCode {
      status
      message
    }
  }
`;

const SEND_RESET_PASS_CODE = gql`
  mutation User_resetPassCode($phoneNumber: String!) {
    user_resetPassCode(phoneNumber: $phoneNumber) {
      status
      message
    }
  }
`;

const CHECK_RESET_PASS_CODE = gql`
  mutation User_submitResetCode($resetCode: String!, $phoneNumber: String!) {
    user_submitResetCode(resetCode: $resetCode, phoneNumber: $phoneNumber) {
      status
      message
    }
  }
`;

const NEW_PASSWORD = gql`
  mutation User_newPass($resetCode: String!, $phoneNumber: String!, $password: String!) {
    user_newPass(resetCode: $resetCode, phoneNumber: $phoneNumber, password: $password) {
      status
      message
    }
  }
`;

export {
  USER_SIGN_UP,
  USER_SIGN_IN,
  UPDATE_PROFILE,
  UPDATE_PROFILE_PIC,
  ENTER_VERIFICATION_CODE,
  SEND_NEW_VERIFICATION_CODE,
  SEND_RESET_PASS_CODE,
  CHECK_RESET_PASS_CODE,
  NEW_PASSWORD,
};
