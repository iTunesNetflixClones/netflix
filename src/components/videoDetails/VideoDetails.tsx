// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { VideoData } from '../../constants/types';
import { BUTTON_MODIFIERS, SPACING } from '../../constants/enums';

// @Components
import Button from '../button/Button';
import Label from '../label/Label';
import VideoAddionalInfo from '../videoAdditionalnfo/VideoAdditionalInfo';
import VideoInfoRow from '../videoInfoRow/VideoInfoRow';

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
          iconSource="fa fa-play"
          onPress={handlePressPlay}
          spacing={[SPACING.right]}
          textKey="videoDetails-play"/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.upperCase]}
          iconSource="fa fa-plus"
          onPress={hanldePressMyList}
          spacing={[SPACING.right]}
          textKey="videoDetails-myList"/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
          iconSource="fa fa-thumbs-up"
          onPress={handlePressLike}
          spacing={[SPACING.right, SPACING.left]}/>
        <Button
          modifiers={[BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.circle]}
          iconSource="fa fa-thumbs-down"
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