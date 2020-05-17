import React, { useCallback, useState } from 'react';
import { Modal, Button, Icon, Image } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';
import styles from './TopProfile.module.scss';
import { UPDATE_PROFILE_PIC } from '../../GraphQl/Mutations/Auth';
import { WHO_IS_ME } from '../../GraphQl/Queries/Auth';
import { toast } from 'react-toastify';

interface Props {
  isModalOpen: boolean;
  closeModal: any;
  profileUrl: string;
}

const UploadProfilePicModal: React.FC<Props> = ({ isModalOpen, closeModal }: Props) => {
  const [src, setSrc] = useState();
  const [image, setImage] = useState(null);

  const [editProfilePic, { loading }] = useMutation(UPDATE_PROFILE_PIC, {
    update() {
      closeModal();
    },
    onError(err) {
      console.log(err);
      toast.error('Something went wrong, please try again later.', {
        position: toast.POSITION.TOP_LEFT,
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: any) => {
    const reader: any = new FileReader();
    reader.addEventListener('load', () => setSrc(reader.result), false);
    reader.readAsDataURL(acceptedFiles[0]);
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadProfile = (): any => {
    console.log(image);
    editProfilePic({
      variables: { file: image },
      refetchQueries: [{ query: WHO_IS_ME }],
    });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        size="tiny"
        closeIcon={!loading}
        centered={false}
        closeOnDimmerClick={false}
        closeOnEscape={false}
        className={styles.customCard}
      >
        <Modal.Content>
          <h3 className={styles.customFormTitle}>Edit profile photo</h3>
        </Modal.Content>
        <Modal.Content image style={{ textAlign: 'center', margin: 'auto' }}>
          <Modal.Description>
            <div {...getRootProps()} style={{ padding: '0.5em' }}>
              <input {...getInputProps()} accept="image/png, image/jpeg" />
              <Button basic color="black" disabled={loading}>
                <Icon name="photo" />
                Upload new photo
              </Button>
            </div>
            <Image wrapped size="small" src={src} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Content>
          <Button
            type="submit"
            className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}
            onClick={uploadProfile}
            loading={loading}
          >
            &nbsp; <Icon name="upload" />
            {loading ? 'Loading...' : 'Upload'}
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UploadProfilePicModal;
