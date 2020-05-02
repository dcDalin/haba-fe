import React, { useContext } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { NEW_PASSWORD } from '../../../GraphQl/Mutations/Auth';

import AuthModalContext from '../../../context/AuthModalContext/authModalContext';
import styles from './ResetPass.module.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  code: string;
  userPhone: string;
}

type FormData = {
  password: string;
  confirmPassword: string;
};

const NewPassModal: React.FC<Props> = (props: Props) => {
  const { userPhone, code } = props;

  const { openLoginModal, isNewPassOpen } = useContext(AuthModalContext);

  const [newPass, { loading }] = useMutation(NEW_PASSWORD);

  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    const { password } = data;

    const res = await newPass({ variables: { resetCode: code, phoneNumber: userPhone, password } });

    const { status, message } = res.data.user_newPass;

    if (status === 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
      });
      openLoginModal();
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <Modal
      size="mini"
      open={isNewPassOpen}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      className={styles.customCard}
      closeIcon
      onClose={openLoginModal}
    >
      <Modal.Content>
        <h3 className={styles.customFormTitle}>New password</h3>
      </Modal.Content>
      <Modal.Content>
        <Form onSubmit={handleSubmit(onSubmit)} loading={loading} className={styles.customForm}>
          <Form.Field>
            <label>Phone number</label>
            <h4 style={{ marginTop: '2px' }}>{userPhone}</h4>
          </Form.Field>
          <Form.Field>
            <label>New password</label>
            <input
              type="password"
              name="password"
              ref={register({ pattern: /^\S+$/, required: true, minLength: 6, maxLength: 15 })}
            />
            {errors.password && errors.password.type === 'required' && <p>Password is required</p>}
            {errors.password && errors.password.type === 'pattern' && <p>Invalid password</p>}
            {errors.password && errors.password.type === 'minLength' && <p>Password is too short</p>}
            {errors.password && errors.password.type === 'maxLength' && <p>Password is long</p>}
          </Form.Field>
          <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
            Reset
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Content>
        <Button className={styles.customLinkButton} onClick={openLoginModal}>
          Login instead?
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default NewPassModal;
