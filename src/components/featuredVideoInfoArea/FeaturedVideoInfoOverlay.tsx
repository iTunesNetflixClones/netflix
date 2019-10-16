// @Vendors
import React, { ReactElement } from 'react';

// @Constants & enums
import { SPACING } from '../../constants/enums';

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
  showDescription: boolean;
  videoDescription: string;
  videoId: string;
}

const FeaturedVideoInfoArea: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    onPressList,
    onPressMoreInfo,
    onPressPlay,
    showDescription,
    videoDescription,
    videoId
  } = props;

  const renderDescription = (): ReactElement | null => {
    if (!showDescription) {
      return null;
    }
    return <p className={styles.descriptionText}>{videoDescription}</p>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.logoArea}>
          <FormattedText
            className={styles.logoText}
            textKey="placeholders-videoLogo"
          />
        </div>
        { renderDescription() }
        <Button
          iconSource="fa fa-play"
          onPress={onPressPlay.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-play"
        />
        <Button
          iconSource="fa fa-plus"
          onPress={onPressList.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-myList"
        />
        <Button
          iconSource="fa fa-info"
          onPress={onPressMoreInfo.bind(null, videoId)}
          spacing={[SPACING.right]}
          textKey="featuredVideoHeader-moreInfo"
        />
      </div>
    </div>
  );
};

export default FeaturedVideoInfoArea;
