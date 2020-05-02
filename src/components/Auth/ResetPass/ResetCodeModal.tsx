import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { CHECK_RESET_PASS_CODE } from '../../../GraphQl/Mutations/Auth';

import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './ResetPass.module.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NewPassModal from './NewPassModal';

interface Props {
  userPhone: string;
}

type FormData = {
  resetCode: string;
};

const ResetCodeModal: React.FC<Props> = (props: Props) => {
  const { userPhone } = props;

  const [code, setCode] = useState('');

  const { openLoginModal, isCodeOpen, openNewPassModal } = useContext(AuthModalContext);

  const [checkCode, { loading }] = useMutation(CHECK_RESET_PASS_CODE);

  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    const { resetCode } = data;

    setCode(resetCode);

    const res = await checkCode({ variables: { resetCode, phoneNumber: userPhone } });

    const { status, message } = res.data.user_submitResetCode;

    if (status === 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
      });
      openNewPassModal();
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
        open={isCodeOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        className={styles.customCard}
        closeIcon
        onClose={openLoginModal}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Reset code</h3>
        </Modal.Content>
        <Modal.Content>
          <Form onSubmit={handleSubmit(onSubmit)} loading={loading} className={styles.customForm}>
            <Form.Field>
              <label>Phone number</label>
              <h4 style={{ marginTop: '2px' }}>{userPhone}</h4>
            </Form.Field>
            <Form.Field>
              <label>Reset code</label>
              <input type="text" name="resetCode" ref={register({ required: true, minLength: 4, maxLength: 4 })} />
              {errors.resetCode && errors.resetCode.type === 'required' && <p>Verification code is required</p>}
              {errors.resetCode && errors.resetCode.type === 'minLength' && <p>Code is too short</p>}
              {errors.resetCode && errors.resetCode.type === 'maxLength' && <p>Code is long</p>}
            </Form.Field>
            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Content>
          <Button className={styles.customLinkButton} onClick={openLoginModal}>
            Login instead?
          </Button>
        </Modal.Content>
      </Modal>
      <NewPassModal code={code} userPhone={userPhone} />
    </>
  );
};

export default ResetCodeModal;
