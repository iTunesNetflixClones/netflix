// @Vendors
import React from 'react';

// @Constants & enums
import { HL_BUTTON_CONTAINER_MODIFIERS } from 'constants/enums';
import { ICON_INFO, ICON_MY_LIST, ICON_PLAY } from 'constants/constants';

// @Components
import HeadlinerButton from 'components/headlinerButton/HeadlinerButton';
import FormattedText from 'components/formattedText/FormattedText';

// @Utils
import { formatText } from 'utils/i18n';

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
        <p className={styles.descriptionText}>{videoDescription}</p>
        <HeadlinerButton
          containerModifiers={[HL_BUTTON_CONTAINER_MODIFIERS.INLINE]}
          iconSource={ICON_PLAY}
          onClick={onPressPlay.bind(null, videoId)}
          text={formatText('featuredVideoHeader-play')}
        />
        <HeadlinerButton
          containerModifiers={[HL_BUTTON_CONTAINER_MODIFIERS.INLINE]}
          iconSource={ICON_MY_LIST}
          onClick={onPressList.bind(null, videoId)}
          text={formatText('featuredVideoHeader-myList')}
        />
        <HeadlinerButton
          containerModifiers={[HL_BUTTON_CONTAINER_MODIFIERS.INLINE]}
          iconSource={ICON_INFO}
          onClick={onPressMoreInfo.bind(null, videoId)}
          text={formatText('featuredVideoHeader-moreInfo')}
        />
      </div>
    </div>
  );
};

export default FeaturedVideoInfoArea;
