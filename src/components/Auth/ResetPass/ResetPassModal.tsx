/* eslint-disable @typescript-eslint/camelcase */
import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import { SEND_RESET_PASS_CODE } from '../../../GraphQl/Mutations/Auth';
import ResetCodeModal from './ResetCodeModal';
import styles from './ResetPass.module.scss';

type FormData = {
  phoneNumber: string;
};

const ResetPassModal: React.FC = () => {
  const { openLoginModal, isResetOpen, openCodeModal } = useContext(AuthModalContext);

  const [userPhone, setUserPhone] = useState();

  const { register, handleSubmit, errors } = useForm<FormData>();

  const [sendNewCode, { loading }] = useMutation(SEND_RESET_PASS_CODE);

  const onSubmit = async (data: any) => {
    const { phoneNumber } = data;

    setUserPhone(phoneNumber);

    const res = await sendNewCode({ variables: { phoneNumber } });

    const { status, message } = res.data.user_resetPassCode;

    if (status === 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
      });
      openCodeModal();
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <>
      <Modal
        size="mini"
        open={isResetOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        className={styles.customCard}
        closeIcon
        onClose={openLoginModal}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Reset password</h3>
        </Modal.Content>
        <Modal.Content>
          <Form onSubmit={handleSubmit(onSubmit)} loading={loading} className={styles.customForm}>
            <Form.Field>
              <label>Phone number</label>
              <input
                type="number"
                placeholder="254---------"
                name="phoneNumber"
                ref={register({ required: true, pattern: /^254/i, minLength: 12, maxLength: 12 })}
              />
              {errors.phoneNumber && errors.phoneNumber.type === 'required' && <p>Phone number is required</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && (
                <p>Your phone number must start with 254</p>
              )}
              {errors.phoneNumber && errors.phoneNumber.type === 'minLength' && <p>Your phone number seems short</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'maxLength' && <p>Your phone number is long</p>}
            </Form.Field>
            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Send reset code
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Content>
          <Button className={styles.customLinkButton} onClick={openLoginModal}>
            Login instead?
          </Button>
        </Modal.Content>
      </Modal>
      <ResetCodeModal userPhone={userPhone} />
    </>
  );
};

export default ResetPassModal;
