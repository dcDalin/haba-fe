/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ENTER_VERIFICATION_CODE } from '../../GraphQl/Mutations/Auth';
import AuthContext from '../../context/AuthContext/authContext';
import styles from './VerificationCode.module.scss';
import SendNewCode from './SendNewCode';

type FormData = {
  verificationCode: string;
};

const VerificationCode: React.FC = () => {
  const { isVerified, loadUser, logOut } = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm<FormData>();

  const [enterVerificationCode, { loading }] = useMutation(ENTER_VERIFICATION_CODE);

  const onSubmit = async (data: any) => {
    const { verificationCode } = data;
    const res = await enterVerificationCode({ variables: { verificationCode } });

    const { user_enterVerificationCode } = res.data;

    if (user_enterVerificationCode) {
      toast.success('Your account has been verified', {
        position: toast.POSITION.TOP_LEFT,
      });
      loadUser();
    } else {
      toast.error('Invalid verification code', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const logOutUser = (): any => {
    logOut();
  };

  return (
    <>
      <Modal
        size="mini"
        open={!isVerified}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        className={styles.customCard}
        closeIcon={!loading}
        onClose={logOutUser}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Enter your verification code</h3>
        </Modal.Content>
        <Modal.Content>
          <Form onSubmit={handleSubmit(onSubmit)} loading={loading} className={styles.customForm}>
            <Form.Field>
              <label>Code</label>
              <input
                type="text"
                name="verificationCode"
                ref={register({ required: true, minLength: 4, maxLength: 4 })}
              />
              {errors.verificationCode && errors.verificationCode.type === 'required' && (
                <p>Verification code is required</p>
              )}
              {errors.verificationCode && errors.verificationCode.type === 'minLength' && <p>Code is too short</p>}
              {errors.verificationCode && errors.verificationCode.type === 'maxLength' && <p>Code is long</p>}
            </Form.Field>

            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Verify
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Content>
          <SendNewCode />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default VerificationCode;
