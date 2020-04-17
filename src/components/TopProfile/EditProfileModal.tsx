/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { ALLOW_CHANGE_USERNAME, ALLOW_CHANGE_PHONE_NUMBER, WHO_IS_ME } from '../../GraphQl/Queries/Auth';
import { UPDATE_PROFILE } from '../../GraphQl/Mutations/Auth';
import styles from './TopProfile.module.scss';

interface Props {
  userName: string;
  displayName: string;
  bio: string;
  phoneNumber: string;
}

type FormData = {
  phoneNumber: string;
  bio: string;
  userName: string;
  displayName: string;
};

const EditProfileModal: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // use custom loading instead of apollo one due to speed
  const [loading, setLoading] = useState(false);

  const closeModal = (): any => setIsModalOpen(false);

  const openModal = (): any => setIsModalOpen(true);

  const client = useApolloClient();

  const { userName, displayName, bio, phoneNumber } = props;

  const { register, handleSubmit, errors } = useForm<FormData>();

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const onSubmit = handleSubmit(({ phoneNumber, bio, userName, displayName }) => {
    setLoading(true);
    updateProfile({
      variables: {
        phoneNumberNew: phoneNumber,
        bio,
        userName,
        displayName,
      },
      refetchQueries: [{ query: WHO_IS_ME }],
    })
      .then(() => {
        closeModal();
        history.push(`${userName}`);
        setLoading(false);
      })
      .catch(() => {
        closeModal();
        setLoading(false);
      });
  });

  return (
    <>
      <Button icon basic onClick={openModal}>
        <Icon name="edit" />
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
          <h3 className={styles.customFormTitle}>Edit my profile</h3>
        </Modal.Content>
        <Modal.Content>
          <Form loading={loading} onSubmit={onSubmit} className={styles.customForm}>
            <Form.Field>
              <label>Username</label>
              <input
                name="userName"
                placeholder="Username"
                defaultValue={userName}
                ref={register({
                  required: true,
                  minLength: 3,
                  pattern: /^[\w-_.]*$/,
                  maxLength: 10,
                  validate: async (value: string): Promise<boolean> => {
                    const response = await client.query({
                      query: ALLOW_CHANGE_USERNAME,
                      variables: { newUserName: value.toLowerCase(), originalUserName: userName },
                    });

                    if (response.data.user_allowChangeUserName) {
                      return false;
                    }
                    return true;
                  },
                })}
              />
              {errors.userName && errors.userName.type === 'required' && <p>Username is required</p>}
              {errors.userName && errors.userName.type === 'pattern' && <p>Username is invalid</p>}
              {errors.userName && errors.userName.type === 'minLength' && (
                <p>Username should be at least 3 characters long</p>
              )}
              {errors.userName && errors.userName.type === 'maxLength' && <p>Username is too long</p>}
              {errors.userName && errors.userName.type === 'validate' && (
                <p>Username already exists, try another one</p>
              )}
            </Form.Field>
            <Form.Field>
              <label>Display Name</label>
              <input
                placeholder="Display name"
                name="displayName"
                defaultValue={displayName}
                ref={register({ required: true, minLength: 3, maxLength: 20 })}
              />
              {errors.displayName && errors.displayName.type === 'required' && <p>Display name is required</p>}
              {errors.displayName && errors.displayName.type === 'minLength' && <p>Display name is too short</p>}
              {errors.displayName && errors.displayName.type === 'maxLength' && <p>Display name is too long</p>}
            </Form.Field>
            <Form.Field>
              <label>Phone number</label>
              <input
                type="number"
                placeholder="254---------"
                name="phoneNumber"
                defaultValue={phoneNumber}
                ref={register({
                  required: true,
                  pattern: /^254/i,
                  minLength: 12,
                  maxLength: 12,
                  validate: async (value: string): Promise<boolean> => {
                    const response = await client.query({
                      query: ALLOW_CHANGE_PHONE_NUMBER,
                      variables: { newPhoneNumber: value, originalPhoneNumber: phoneNumber },
                    });

                    if (response.data.user_allowChangePhoneNumber) {
                      return false;
                    }
                    return true;
                  },
                })}
              />
              {errors.phoneNumber && errors.phoneNumber.type === 'required' && <p>Phone number is required</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && <p>Phone number must start with 254</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'minLength' && <p>Your phone number seems short</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'maxLength' && <p>Your phone number is long</p>}
              {errors.phoneNumber && errors.phoneNumber.type === 'validate' && <p>Phone number already exists</p>}
            </Form.Field>
            <Form.Field>
              <label>Bio</label>
              <textarea name="bio" defaultValue={bio} ref={register({ minLength: 50, maxLength: 400 })}></textarea>

              {errors.bio && errors.bio.type === 'minLength' && <p>Your bio is short</p>}
              {errors.bio && errors.bio.type === 'maxLength' && <p>Your bio is long</p>}
            </Form.Field>
            <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default EditProfileModal;
