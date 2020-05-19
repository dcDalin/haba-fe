import React, { useState } from 'react';
import { Modal, Button, Icon, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import HABA_REPLY from '../../GraphQl/Mutations/Haba';
import { USER_HABAS } from '../../GraphQl/Queries/Auth';

import styles from './Feed.module.scss';

interface Props {
  habaId: string;
  origReply: string;
  userName: string;
}

type FormData = {
  reply: string;
};

const FeedCommentModal: React.FC<Props> = (props: Props) => {
  const { habaId, origReply, userName } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (): any => setIsModalOpen(false);

  const openModal = (): any => setIsModalOpen(true);

  const [habaReply, { loading }] = useMutation(HABA_REPLY);

  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ reply }) => {
    habaReply({
      variables: {
        habaId,
        reply,
      },
      refetchQueries: [{ query: USER_HABAS, variables: { userName, cursor: '', limit: 10 } }],
    })
      .then(res => {
        const { status, message } = res.data.haba_reply;
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
        toast.error('An unknown error occured, please try again later', {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  });

  return (
    <>
      <Button basic size="tiny" onClick={openModal}>
        <Icon name="comment outline" />
      </Button>
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
          <h3 className={styles.customFormTitle}>Reply to Haba</h3>
        </Modal.Content>
        <Modal.Content>
          <Form loading={loading} onSubmit={onSubmit} className={styles.customForm}>
            <Form.Field>
              <label>Reply</label>
              <textarea
                name="reply"
                defaultValue={origReply}
                ref={register({ required: true, minLength: 10, maxLength: 400 })}
              ></textarea>
              {errors.reply && errors.reply.type === 'required' && <p>Reply is required</p>}
              {errors.reply && errors.reply.type === 'minLength' && <p>Your reply is short</p>}
              {errors.reply && errors.reply.type === 'maxLength' && <p>Your reply is long</p>}
            </Form.Field>
            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Reply
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FeedCommentModal;
