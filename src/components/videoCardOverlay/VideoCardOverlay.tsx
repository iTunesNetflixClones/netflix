// @Vendors
import React from 'react';

// @Constants
import { BUTTON_MODIFIERS } from '../../constants/enums';
import { VIDEO_OVERLAY_SEPARATOR_CHAR } from '../../constants/constants';

// @Components
import Button from '../button/Button';
import FooterButton from '../footerButton/FooterButton';
import FormattedText from '../formattedText/FormattedText';
import Label from '../label/Label';

// @Utils
import { Duration, formatDuration } from '../../utils/dateHelper';
import { getParentalAgeText } from '../../utils/miscHelper';

// @Styles
import styles from './VideoCardOverlay.module.scss';

type propTypes = {
  onPressExpand: () => any,
  playing: boolean,
  videoData: {
    coincidence: number,
    duration: number,
    parentalAge: number,
    src: string,
    tags: Array<string>,
    title: string
  }
}

const VideoCardOverlay = (props: propTypes) => {
  const { onPressExpand, videoData } = props;

  const formattedVideoDuration: Duration = formatDuration(videoData.duration);

  const parentalText = getParentalAgeText(videoData.parentalAge);

  const renderTags = () => (
    videoData.tags.map((tag, index) => {
      let separator;
      if(!(index === videoData.tags.length - 1)) {
        separator = (
          <Label
            className={styles.separator}
            text={VIDEO_OVERLAY_SEPARATOR_CHAR} />
        );
      }
      return (
        <React.Fragment>
          <Label
            className={styles.tag}
            text={tag} />
          {separator}
        </React.Fragment>
      )
    })
  )

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <Button
          iconSource="fa fa-play"
          modifiers={[BUTTON_MODIFIERS.circle, BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.redContent]}
          onPress={() => {}}
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
        <div className={styles.tagsRow}>
          { renderTags() }
        </div>
      </div>
      <FooterButton
        onPress={onPressExpand}/>
    </div>
  )
};

export default VideoCardOverlay;