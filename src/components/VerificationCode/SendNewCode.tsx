import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { SEND_NEW_VERIFICATION_CODE } from '../../GraphQl/Mutations/Auth';

import styles from './VerificationCode.module.scss';

const SendNewCode: React.FC = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const [sendNewCode, { loading }] = useMutation(SEND_NEW_VERIFICATION_CODE);

  const handleNewCode = async () => {
    const res = await sendNewCode();

    const { status, message } = res.data.user_sendVerificationCode;

    if (status === 'success') {
      closeModal();
      toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onOpen={openModal}
        onClose={closeModal}
        size="tiny"
        closeIcon={!loading}
        trigger={<Button className={styles.customLinkButton}>Get new code?</Button>}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Get new verification code</h3>
        </Modal.Content>
        <Modal.Content>
          <Button
            type="submit"
            className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}
            onClick={handleNewCode}
            loading={loading}
          >
            Send Code
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SendNewCode;
