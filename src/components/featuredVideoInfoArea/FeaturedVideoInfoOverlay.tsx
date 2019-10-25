// @Vendors
import React from 'react';

// @Constants & enums
import { SPACING } from '../../constants/enums';
import { ICON_INFO, ICON_MY_LIST, ICON_PLAY } from '../../constants/constants';

// @Components
import Button from '../button/Button';
import FormattedText from '../formattedText/FormattedText';

// @Styles
import styles from './FeaturedVideoInfoOverlay.module.scss';

// @PropTypes
interface PropTypes {
  onPressPlay: (videoId: string) => any;
  onPressList: (videoId: string) => any;
  onPressMoreInfo: (videoId: string) => any;
  videoDescription: string;
  videoId: string;
}

const FeaturedVideoInfoArea: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    onPressList,
    onPressMoreInfo,
    onPressPlay,
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
        <p className={styles.descriptionText}>{videoDescription}</p>;
        <Button
          iconSource={ICON_PLAY}
          onPress={onPressPlay.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-play"
        />
        <Button
          iconSource={ICON_MY_LIST}
          onPress={onPressList.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-myList"
        />
        <Button
          iconSource={ICON_INFO}
          onPress={onPressMoreInfo.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-moreInfo"
        />
      </div>
    </div>
  );
};

export default FeaturedVideoInfoArea;
