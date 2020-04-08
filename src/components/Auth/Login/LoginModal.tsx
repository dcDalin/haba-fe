/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import { Divider, Button, Form, Icon, Modal, Message } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { History } from 'history';
import { useMutation } from '@apollo/react-hooks';
import { USER_SIGN_IN } from '../../../GraphQl/Mutations/Auth';
import AuthContext from '../../../context/AuthContext/authContext';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './Login.module.scss';
import SignUpModal from '../SignUp/SignUpModal';

interface Props {
  history: History;
}

type FormData = {
  email: string;
  password: string;
};

const LoginModal: React.FC<Props> = (props: Props) => {
  // Get context stuff
  const { setToken, isAuthenticated } = useContext(AuthContext);
  const { openLoginModal, closeLoginModal, isLoginOpen, openChooseSignupModal } = useContext(AuthModalContext);

  // use form stuff
  const { register, handleSubmit, errors, setValue, triggerValidation } = useForm<FormData>();

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    register(
      { name: 'email' },
      {
        required: true,
        pattern: /\S+@\S+\.\S+/,
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
  }, [register, isAuthenticated, props.history]);

  const [genErr, setGenErr] = useState();
  const [visible, setVisible] = useState(false);

  const [loginUser, { loading }] = useMutation(USER_SIGN_IN, {
    update(_, { data }) {
      setToken(data.user_signIn.token);
      props.history.push('/');
    },
    onError(err) {
      setGenErr(err.graphQLErrors[0].message);
      setVisible(true);
    },
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    loginUser({
      variables: {
        email,
        password,
      },
    });
  });

  const handleDismiss = (): any => {
    setVisible(false);
  };

  return (
    <>
      <Button className={styles.authButton} onClick={openLoginModal}>
        Sign In
      </Button>

      {/* Sign up modal placed here */}
      <SignUpModal />
      {/* Sign up modal placed here */}
      <Modal
        size="mini"
        open={isLoginOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={closeLoginModal}
        closeIcon
        className={styles.customCard}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Login to HabaHaba</h3>
          <Button
            className={`${styles.customSuccessButton} ${styles.facebookColor}`}
            style={{ marginBottom: '10px' }}
            onClick={(): any => window.open(`${process.env.REACT_APP_HABAHABA_URL}/auth/facebook`, '_self')}
          >
            <Icon name="facebook" />
            Login with Facebook
          </Button>

          <Button
            className={`${styles.customSuccessButton} ${styles.googleColor}`}
            onClick={(): any => window.open(`${process.env.REACT_APP_HABAHABA_URL}/auth/google`, '_self')}
          >
            <Icon name="google" />
            Login with Google
          </Button>
        </Modal.Content>
        <Modal.Content style={{ textAlign: 'center' }}>
          <p>or</p>
          {genErr && visible ? <Message error header="Sorry" content={genErr} onDismiss={handleDismiss} /> : null}

          <Form loading={loading} className={styles.customForm} noValidate onSubmit={onSubmit}>
            <Form.Input
              className={styles.customFormInput}
              type="email"
              label="Email"
              fluid
              placeholder="Email Address"
              name="email"
              onChange={async (e, { name, value }): Promise<void> => {
                setValue(name, value);
                await triggerValidation(name);
              }}
              error={!!errors.email}
            />
            {errors.email && errors.email.type === 'required' && <p>Email is required</p>}
            {errors.email && errors.email.type === 'pattern' && <p>Your email is invalid</p>}
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
            <br />
            <Link to="/forgotpass" className={styles.customLink}>
              Forgot your password?
            </Link>

            <Divider />
            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Log in
            </Button>
          </Form>

          <Divider />

          <p>
            Do not have an account?
            <Button onClick={openChooseSignupModal} className={styles.customLinkButton}>
              &nbsp;Sign up today.
            </Button>
          </p>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withRouter(LoginModal);
