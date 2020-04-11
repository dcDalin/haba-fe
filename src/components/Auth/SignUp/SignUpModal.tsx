import React, { useEffect, useContext } from 'react';
import { Divider, Button, Form, Modal } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { USER_SIGN_UP } from '../../../GraphQl/Mutations/Auth';
import { CHECK_USERNAME_EXISTS, CHECK_PHONE_NUMBER_EXISTS } from '../../../GraphQl/Queries/Auth';
import AuthContext from '../../../context/AuthContext/authContext';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './SignUp.module.scss';

type FormData = {
  username: string;
  phoneNumber: string;
  password: string;
};

const SignUpModal: React.FC = () => {
  // Get context stuff
  const { setToken } = useContext(AuthContext);
  const { closeSignUpModal, isSignUpOpen, openLoginModal } = useContext(AuthModalContext);

  const client = useApolloClient();

  const history = useHistory();

  const { register, handleSubmit, errors, setValue, triggerValidation } = useForm<FormData>();

  useEffect(() => {
    register(
      { name: 'username' },
      {
        required: true,
        minLength: 3,
        pattern: /^[\w-_.]*$/,
        maxLength: 10,
        validate: async (value: string): Promise<boolean> => {
          const response = await client.query({
            query: CHECK_USERNAME_EXISTS,
            variables: { userName: value.toLowerCase() },
          });

          if (response.data.user_userNameExists) {
            return false;
          }
          return true;
        },
      },
    );

    register(
      { name: 'phoneNumber' },
      {
        required: true,
        pattern: /^254/i,
        minLength: 12,
        maxLength: 12,
        validate: async (value: string): Promise<boolean> => {
          const response = await client.query({
            query: CHECK_PHONE_NUMBER_EXISTS,
            variables: { phoneNumber: value },
          });

          if (response.data.user_userPhoneNumberExists) {
            return false;
          }
          return true;
        },
      },
    );
    register(
      { name: 'password' },
      {
        pattern: /^\S+$/,
        required: true,
        minLength: 6,
        maxLength: 15,
      },
    );
  }, [register]);

  const [addUser, { loading }] = useMutation(USER_SIGN_UP, {
    update(_, { data }) {
      const { token, userName } = data.user_signUp;
      setToken(token);
      history.push(`/${userName}`);
      closeSignUpModal();
    },
    onError(err) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(err.graphQLErrors[0].extensions!.exception.errors);
    },
  });

  const onSubmit = handleSubmit(({ username, phoneNumber, password }) => {
    addUser({
      variables: {
        userName: username,
        phoneNumber,
        password,
      },
    });
  });
  return (
    <>
      <Modal
        size="mini"
        open={isSignUpOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={closeSignUpModal}
        closeIcon
        className={styles.customCard}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Create a new HabaHaba account</h3>
        </Modal.Content>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Form className={styles.customForm} noValidate onSubmit={onSubmit} loading={loading}>
            <Form.Input
              className={styles.customFormInput}
              type="text"
              label="Username"
              fluid
              placeholder="Username"
              name="username"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.username}
            />
            {errors.username && errors.username.type === 'required' && <p>Username is required</p>}
            {errors.username && errors.username.type === 'pattern' && <p>Username is invalid</p>}
            {errors.username && errors.username.type === 'minLength' && (
              <p>Username should be at least 3 characters long</p>
            )}
            {errors.username && errors.username.type === 'maxLength' && <p>Username is too long</p>}
            {errors.username && errors.username.type === 'validate' && <p>Username already exists</p>}
            <Form.Input
              className={styles.customFormInput}
              type="phoneNumber"
              label="Phone Number"
              fluid
              placeholder="254---------"
              name="phoneNumber"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.phoneNumber}
            />
            {errors.phoneNumber && errors.phoneNumber.type === 'required' && <p>Phone number is required</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && <p>Your phone number is invalid</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'minLength' && <p>Your phone number seems short</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'maxLength' && <p>Your phone number is long</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'validate' && <p>Phone number already exists</p>}
            <Form.Input
              className={styles.customFormInput}
              type="password"
              label="Password"
              fluid
              placeholder="Password"
              name="password"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.password}
            />
            {errors.password && errors.password.type === 'pattern' && <p>No spaces allowed</p>}
            {errors.password && errors.password.type === 'required' && <p>Password is required</p>}
            {errors.password && errors.password.type === 'minLength' && (
              <p>Password should have at least 6 characters</p>
            )}
            {errors.password && errors.password.type === 'maxLength' && <p>Password is too long</p>}
            <Button
              type="submit"
              className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
          </Form>
          <Divider />
          <p className={styles.customBottomText}>By signing up, you agree to HabaHabas Terms of Service.</p>
          <p>
            <Button onClick={openLoginModal} className={styles.customLinkButton}>
              Login instead.
            </Button>
          </p>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SignUpModal;
