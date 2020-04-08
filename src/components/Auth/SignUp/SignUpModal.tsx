/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { Modal, Header, Divider, Button, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import SignUpFormModal from './SignUpFormModal';
import styles from './SignUp.module.scss';

const SignupModal: React.FC = () => {
  const { isChooseSignUpOpen, closeChooseSignUpModal, openSignUpModal } = useContext(AuthModalContext);
  return (
    <>
      <Modal
        size="mini"
        open={isChooseSignUpOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={closeChooseSignUpModal}
        closeIcon
        className={styles.customCard}
      >
        <Modal.Header className={styles.customFormTitle}>
          <Header as="h1" textAlign="center">
            Sign Up
          </Header>
        </Modal.Header>
        <Modal.Content style={{ textAlign: 'center' }}>
          <Button
            className={`${styles.customSuccessButton} ${styles.facebookColor}`}
            style={{ marginBottom: '10px' }}
            onClick={(): any => window.open(`${process.env.REACT_APP_HABAHABA_URL}/auth/facebook`, '_self')}
          >
            <Icon name="facebook" />
            Sign up with Facebook
          </Button>

          <Button
            className={`${styles.customSuccessButton} ${styles.googleColor}`}
            onClick={(): any => window.open(`${process.env.REACT_APP_HABAHABA_URL}/auth/google`, '_self')}
          >
            <Icon name="google" />
            Sign up with Google
          </Button>

          <Divider />

          <p>
            <Button basic color="black" onClick={openSignUpModal}>
              <Icon name="mail" />
              Sign up with email
            </Button>
          </p>
        </Modal.Content>
      </Modal>
      <SignUpFormModal />
    </>
  );
};

export default withRouter(SignupModal);
