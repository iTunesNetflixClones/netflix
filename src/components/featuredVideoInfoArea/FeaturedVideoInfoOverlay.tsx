// @Vendors
import React from 'react';

// @Constants & enums
import { HL_BUTTON_CONTAINER_MODIFIERS, HL_BUTTON_MODIFIERS } from 'constants/enums';
import { ICON_INFO, ICON_LINK } from 'constants/constants';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import HeadlinerButton from 'components/headlinerButton/HeadlinerButton';
import Label from 'components/label/Label';

// @Utils
import { formatText } from 'utils/i18n';

// @Styles
import styles from './FeaturedVideoInfoOverlay.module.scss';

// @PropTypes
interface PropTypes {
  onPressPlay: () => any;
  onPressMoreInfo: (videoId: string) => any;
  podcastDescription: string;
  podcastName: string;
  videoId: string;
}

const FeaturedVideoInfoArea: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    onPressMoreInfo,
    onPressPlay,
    podcastDescription,
    podcastName,
    videoId
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Label
          className={styles.titleText}
          text={podcastName} />
        <FormattedText
          className={styles.subtitleText}
          textKey="featuredVideoHeader-watchAndListen" />
        <Label
          className={styles.descriptionText}
          text={podcastDescription} />
        <HeadlinerButton
          containerModifiers={[HL_BUTTON_CONTAINER_MODIFIERS.INLINE]}
          modifiers={[HL_BUTTON_MODIFIERS.GRADIENT_BG]}
          iconSource={ICON_LINK}
          onClick={onPressPlay} />
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
