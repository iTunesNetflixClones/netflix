// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { BUTTON_MODIFIERS } from '../../constants/enums';
import { VIDEO_OVERLAY_SEPARATOR_CHAR } from '../../constants/constants';
import { VideoData } from '../../constants/types';

// @Components
import Button from '../button/Button';
import FooterButton from '../footerButton/FooterButton';
import FormattedText from '../formattedText/FormattedText';
import Label from '../label/Label';

// @Utils
import { Duration, formatDuration } from '../../utils/dateHelper';
import { getParentalAgeText } from '../../utils/miscHelper';

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

  const formattedVideoDuration: Duration = formatDuration(videoData.duration);

  const parentalText = getParentalAgeText(videoData.parentalAge);

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
          iconSource="fa fa-play"
          modifiers={[BUTTON_MODIFIERS.circle, BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.redContent]}
          onPress={onPressPlay}
        />
        <Label
          className={styles.titleText}
          text={videoData.title}/>
        <div className={styles.dataRow}>
          <FormattedText
            className={styles.coincidenceText}
            injectedTexts={[videoData.coincidence]}
            textKey="videoOverlay-coincidence"/>
          <FormattedText
            className={styles.parentalLabel}
            injectedTexts={[videoData.parentalAge]}
            textKey={parentalText}/>
          <FormattedText
            className={styles.durationText}
            injectedTexts={formattedVideoDuration.values}
            textKey={formattedVideoDuration.textKey}/>
        </div>
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