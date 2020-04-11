/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from 'react';
import { Divider, Button, Form, Modal, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { USER_SIGN_IN } from '../../../GraphQl/Mutations/Auth';
import AuthContext from '../../../context/AuthContext/authContext';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './Login.module.scss';
import SignUpModal from '../SignUp/SignUpModal';

type FormData = {
  phoneNumber: string;
  password: string;
};

const LoginModal: React.FC = () => {
  // Get context stuff
  const { setToken, isAuthenticated } = useContext(AuthContext);
  const { openLoginModal, closeLoginModal, isLoginOpen, openSignUpModal } = useContext(AuthModalContext);

  const history = useHistory();

  // use form stuff
  const { register, handleSubmit, errors, setValue, triggerValidation } = useForm<FormData>();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    register(
      { name: 'phoneNumber' },
      {
        required: true,
        pattern: /^254/i,
        minLength: 12,
        maxLength: 12,
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
  }, [register, isAuthenticated]);

  const [genErr, setGenErr] = useState();
  const [visible, setVisible] = useState(false);

  const [loginUser, { loading }] = useMutation(USER_SIGN_IN, {
    update(_, { data }) {
      const { token, userName } = data.user_signIn;
      setToken(token);
      history.push(`/${userName}`);
      closeLoginModal();
    },
    onError(err) {
      setGenErr(err.graphQLErrors[0].message);
      setVisible(true);
    },
  });

  const onSubmit = handleSubmit(({ phoneNumber, password }) => {
    loginUser({
      variables: {
        phoneNumber,
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
        </Modal.Content>
        <Modal.Content style={{ textAlign: 'center' }}>
          {genErr && visible ? <Message error header="Sorry" content={genErr} onDismiss={handleDismiss} /> : null}

          <Form loading={loading} className={styles.customForm} noValidate onSubmit={onSubmit}>
            <Form.Input
              className={styles.customFormInput}
              type="number"
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
            {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && (
              <p>Your phone number must start with 254</p>
            )}
            {errors.phoneNumber && errors.phoneNumber.type === 'minLength' && <p>Your phone number seems short</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'maxLength' && <p>Your phone number is long</p>}
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
            <Button onClick={openSignUpModal} className={styles.customLinkButton}>
              &nbsp;Sign up today.
            </Button>
          </p>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default LoginModal;
