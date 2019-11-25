// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { PodcastData } from 'constants/types';
import { BUTTON_MODIFIERS, HL_BUTTON_MODIFIERS, SPACING, HL_BUTTON_CONTAINER_MODIFIERS } from 'constants/enums';
import { ICON_LIKE, ICON_LINK, ICON_UNLIKE } from 'constants/constants';

// @Components
import CircularButton from 'components/button/CircularButton';
import HeadlinerButton from 'components/headlinerButton/HeadlinerButton';
import Label from 'components/label/Label';
import VideoAddionalInfo from 'components/videoAdditionalnfo/VideoAdditionalInfo';
import VideoInfoRow from 'components/videoInfoRow/VideoInfoRow';

// @Styles
import styles from './VideoDetails.module.scss';

// @PropTypes
interface PropTypes {
  onPressLike: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  videoData: PodcastData;
}

const VideoDetails: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressLike, onPressUnlike, videoData } = props;

  const handlePressLinkButton = (): void => {
    window.open(videoData.website, '_blank');
  };

  const handlePressLike = (): void => {
    onPressLike(videoData.id);
  };

  const handlePressUnlike = (): void => {
    onPressUnlike(videoData.id);
  };

  const renderButtonsRow = (): ReactElement => {
    return (
      <div className={styles.buttonsRow}>
        <HeadlinerButton
          containerModifiers={[HL_BUTTON_CONTAINER_MODIFIERS.INLINE]}
          modifiers={[HL_BUTTON_MODIFIERS.GRADIENT_BG]}
          iconSource={ICON_LINK}
          onClick={handlePressLinkButton} />
        <CircularButton
          modifiers={[BUTTON_MODIFIERS.withBorder]}
          iconSource={ICON_LIKE}
          onPress={handlePressLike}
          spacing={[SPACING.right, SPACING.left]}/>
        <CircularButton
          modifiers={[BUTTON_MODIFIERS.withBorder]}
          iconSource={ICON_UNLIKE}
          onPress={handlePressUnlike}
          spacing={[SPACING.right, SPACING.left]}/>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.dataContainer}>
        <VideoInfoRow
          videoData={videoData}/>
        <Label
          className={styles.descriptionText}
          text={videoData.description}/>
        { renderButtonsRow() }
        <VideoAddionalInfo
          videoData={videoData}/>
      </div>
    </div>
  );
};

export default VideoDetails;
