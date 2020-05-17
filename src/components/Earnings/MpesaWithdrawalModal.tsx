import React, { useState } from 'react';
import { Modal, Button, Grid, Label, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { INITIATE_MPESA_WITHDRAWAL } from '../../GraphQl/Mutations/Earnings';
import { toast } from 'react-toastify';
import styles from './Earnings.module.scss';
import { useMutation } from '@apollo/react-hooks';

type FormData = {
  amount: string;
};

const MpesaWithdrawalModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (): any => setIsModalOpen(false);

  const openModal = (): any => setIsModalOpen(true);

  const { register, handleSubmit, errors } = useForm<FormData>();

  const [mpesaWithdraw, { loading }] = useMutation(INITIATE_MPESA_WITHDRAWAL);

  const onSubmit = handleSubmit(({ amount }) => {
    const floatAmt = parseFloat(amount);
    mpesaWithdraw({
      variables: {
        amount: floatAmt,
      },
    })
      .then(res => {
        const { status, message } = res.data.earnings_initiateMpesaWithdrawal;
        closeModal();
        if (status === 'error') {
          toast.error(message, {
            position: toast.POSITION.TOP_LEFT,
          });
        } else {
          toast.success(message, {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      })
      .catch(() => {
        closeModal();
        toast.error('An unknown error occured, please try againg later', {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  });
  return (
    <>
      <Grid stackable>
        <Grid.Column>
          <span className={styles.dashSubHeading}>WITHDRAW</span>
          <Label as="Button" image size="big" className={styles.mpesaBtn} onClick={openModal}>
            <img
              src="https://mpasho254.files.wordpress.com/2018/11/mpesa.png"
              alt="mpesa"
              className={styles.mpesaImg}
            />
            <span className={styles.mpesaText}>MPesa</span>
          </Label>
        </Grid.Column>
        <Modal
          size="tiny"
          open={isModalOpen}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={closeModal}
          closeIcon
          className={styles.customCard}
        >
          <Modal.Content>
            <h3 className={styles.customFormTitle}>Withdraw your Earnings</h3>
          </Modal.Content>
          <Modal.Content>
            <Form loading={loading} onSubmit={onSubmit} className={styles.customForm}>
              <Form.Field>
                <label>Amount</label>
                <input
                  name="amount"
                  type="number"
                  placeholder="250"
                  ref={register({
                    required: true,
                    pattern: /^[\d]*$/,
                    min: 250,
                    max: 70000,
                  })}
                />
                {errors.amount && errors.amount.type === 'required' && <p>Amount is required</p>}
                {errors.amount && errors.amount.type === 'min' && <p>You can withdraw a minimum of 250</p>}
                {errors.amount && errors.amount.type === 'max' && <p>Maximum withdrawal amount is 70,000</p>}
                {errors.amount && errors.amount.type === 'pattern' && <p>Amount is invalid</p>}
              </Form.Field>
              <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
                Withdraw
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid>
    </>
  );
};

export default MpesaWithdrawalModal;
