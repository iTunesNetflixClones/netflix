// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { BUTTON_MODIFIERS } from '../../constants/enums';
import { ICON_PLAY, VIDEO_OVERLAY_SEPARATOR_CHAR } from '../../constants/constants';
import { VideoData } from '../../constants/types';

// @Components
import Button from '../button/Button';
import FooterButton from '../footerButton/FooterButton';
import Label from '../label/Label';
import VideoInfoRow from '../videoInfoRow/VideoInfoRow';

// @Styles
import styles from './VideoCardOverlay.module.scss';

// @PropTypes
interface PropTypes {
  onPressExpand: () => void;
  onPressPlay: () => void;
  playing: boolean;
  videoData: VideoData;
}

const VideoCardOverlay: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressExpand, onPressPlay, videoData } = props;

  const renderTags = (): Array<ReactElement> => (
    videoData.tags.map((tag: string, index: number) => {
      let separator;
      if(!(index === videoData.tags.length - 1)) {
        separator = (
          <Label
            className={styles.separator}
            text={VIDEO_OVERLAY_SEPARATOR_CHAR} />
        );
      }
      return (
        <React.Fragment
          key={tag}>
          <Label
            className={styles.tag}
            text={tag} />
          {separator}
        </React.Fragment>
      );
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <Button
          iconSource={ICON_PLAY}
          modifiers={[BUTTON_MODIFIERS.circle, BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.redContent]}
          onPress={onPressPlay}
        />
        <Label
          className={styles.titleText}
          text={videoData.title}/>
        <VideoInfoRow
          videoData={videoData}/>
        <div >
          { renderTags() }
        </div>
      </div>
      <FooterButton
        onPress={onPressExpand}/>
    </div>
  );
};

export default VideoCardOverlay;