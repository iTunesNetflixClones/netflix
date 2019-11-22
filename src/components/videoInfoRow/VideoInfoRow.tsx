// @Vendors
import React, { ReactElement } from 'react';

// @Styles
import styles from './VideoInfoRow.module.scss';

// @Components
import FormattedText from 'components/formattedText/FormattedText';

// @Helpers
import { getParentalAgeText } from 'utils/miscHelper';

// @Constants
import { PodcastData } from 'constants/types';

// @PropTypes
interface PropTypes {
  showHighlightedText?: boolean;
  showParentalTag?: boolean;
  videoData: PodcastData;
}

const VideoInfoRow: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData, showHighlightedText, showParentalTag } = props;

  const { coincidence, episodesAmount, isNew } = videoData;

  const parentalText = getParentalAgeText(videoData.explicit);

  const renderHighlightedText = (): ReactElement | null => {
    if(!showHighlightedText) {
      return null;
    }

    const textKey = isNew ? "videoDetails-new" : "videoDetails-coincidence";
    return (
      <FormattedText
        className={styles.coincidenceText}
        injectedTexts={[coincidence]}
        textKey={textKey}/>
    );
  };

  const renderDurationSeasonsText = (): ReactElement => {
    const textKey = episodesAmount === 1 ? "videoDetails-episodesAmount" : "videoDetails-episodesAmountPlural";
    return (
      <FormattedText
        className={styles.infoRowText}
        injectedTexts={[episodesAmount || '']}
        textKey={textKey} />
    );
  };

  const renderParentalTag = (): ReactElement | null => {
    if(!showParentalTag) {
      return null;
    }

    return  (
      <FormattedText
        className={styles.parentalLabel}
        injectedTexts={[]}
        textKey={parentalText}/>
    );
  };

  return (
    <div className={styles.row}>
      { renderHighlightedText() }
      { renderParentalTag() }
      { renderDurationSeasonsText() }
    </div>
  );
};

VideoInfoRow.defaultProps = {
  showHighlightedText: true,
  showParentalTag: true
};

export default VideoInfoRow;