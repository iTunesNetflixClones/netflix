// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { VideoData } from 'constants/types';
import { BUTTON_MODIFIERS, SPACING } from 'constants/enums';
import { ICON_LIKE, ICON_MY_LIST, ICON_PLAY, ICON_UNLIKE } from 'constants/constants';

// @Components
import Button from 'components/button/Button';
import Label from 'components/label/Label';
import VideoAddionalInfo from 'components/videoAdditionalnfo/VideoAdditionalInfo';
import VideoInfoRow from 'components/videoInfoRow/VideoInfoRow';

// @Styles
import styles from './VideoDetails.module.scss';

// @PropTypes
interface PropTypes {
  onPressPlay: (videoId: string) => void;
  onPressMyList: (videoId: string) => void;
  onPressLike: (videoId: string) => void;
  onPressUnlike: (videoId: string) => void;
  videoData: VideoData;
}

const VideoDetails: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressPlay, onPressMyList, onPressLike, onPressUnlike, videoData } = props;

  const handlePressPlay = (): void => {
    onPressPlay(videoData.id);
  };

  const hanldePressMyList = (): void => {
    onPressMyList(videoData.id);
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
        <Button
          modifiers={[BUTTON_MODIFIERS.redBody, BUTTON_MODIFIERS.upperCase]}
          iconSource={ICON_PLAY}
          onPress={handlePressPlay}
          spacing={[SPACING.right]}
          textKey="videoDetails-play"/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.upperCase]}
          iconSource={ICON_MY_LIST}
          onPress={hanldePressMyList}
          spacing={[SPACING.right]}
          textKey="videoDetails-myList"/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
          iconSource={ICON_LIKE}
          onPress={handlePressLike}
          spacing={[SPACING.right, SPACING.left]}/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
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
          showYear
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
