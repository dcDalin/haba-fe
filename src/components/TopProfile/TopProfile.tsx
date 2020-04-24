import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './TopProfile.module.scss';
import EditProfileModal from './EditProfileModal';
import UploadProfilePicModal from './UploadProfilePicModal';

interface Props {
  data: {
    user_profile: any;
  };
  authId: number;
}

const TopProfile: React.FC<Props> = (props: Props) => {
  const { id, userName, displayName, bio, profileUrl } = props.data.user_profile.user;
  const { authId } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (): any => {
    setIsModalOpen(false);
  };

  const openModal = (): any => {
    setIsModalOpen(true);
  };

  return (
    <Grid className={styles.wrapper} container centered>
      <Grid.Column width={4}>
        <div className={styles.leftWrap}>
          {id === authId ? (
            <img
              src={profileUrl}
              alt={userName}
              onClick={openModal}
              className={styles.profileImage}
              width="150"
              height="150"
            />
          ) : (
            <img src={profileUrl} alt={userName} className={styles.profileImage} width="150" height="150" />
          )}
          <h1 className={styles.userName}>{userName}</h1>
        </div>
      </Grid.Column>
      <Grid.Column floated="right" width={12}>
        <div className={styles.dispName}>
          <span className={styles.userName}> {displayName}</span>
          <span>{id === authId && <EditProfileModal userName={userName} displayName={displayName} bio={bio} />}</span>
        </div>

        <p className={styles.bio}>{bio}</p>
      </Grid.Column>

      <UploadProfilePicModal isModalOpen={isModalOpen} closeModal={closeModal} profileUrl={profileUrl} />
    </Grid>
  );
};

export default TopProfile;
