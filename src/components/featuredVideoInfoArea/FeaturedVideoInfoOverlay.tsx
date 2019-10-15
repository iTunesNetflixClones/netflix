// @Vendors
import React from 'react';

// @Constants & enums
import { BUTTON_MODIFIERS, SPACING } from '../../constants/enums';

// @Components
import Button from '../button/Button';
import FormattedText from '../formattedText/FormattedText';

// @Styles
import styles from './FeaturedVideoInfoOverlay.module.scss';

type propTypes = {
  onPressPlay: (videoId: string) => any;
  onPressList: (videoId: string) => any;
  onPressMoreInfo: (videoId: string) => any;
  showDescription: boolean;
  videoDescription: string;
  videoId: string;
};

const renderDescription = (
  showDescription: boolean,
  desciptionText: string
) => {
  if (!showDescription) {
    return null;
  }
  return <p className={styles.descriptionText}>{desciptionText}</p>;
};

const FeaturedVideoInfoArea = (props: propTypes) => {
  const {
    onPressList,
    onPressMoreInfo,
    onPressPlay,
    showDescription,
    videoDescription,
    videoId
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.logoArea}>
          <FormattedText
            className={styles.logoText}
            textKey="placeholders-videoLogo"
          />
        </div>
        {renderDescription(showDescription, videoDescription)}
        <Button
          iconSource="fa fa-play"
          onPress={() => {
            onPressPlay(videoId);
          }}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-play"
        />
        <Button
          iconSource="fa fa-plus"
          onPress={() => {
            onPressList(videoId);
          }}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-myList"
        />
        <Button
          iconSource="fa fa-info"
          onPress={() => {
            onPressMoreInfo(videoId);
          }}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-moreInfo"
        />
      </div>
    </div>
  );
};

export default FeaturedVideoInfoArea;
