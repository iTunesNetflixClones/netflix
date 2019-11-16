// @Vendors
import React, { ReactElement } from 'react';

// @Styles
import styles from './VideoInfoRow.module.scss';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';

// @Helpers
import { formatDuration } from 'utils/dateHelper';
import { getParentalAgeText } from 'utils/miscHelper';

// @Constants
import { Duration, PodcastData } from 'constants/types';

// @PropTypes
interface PropTypes {
  showHighlightedText?: boolean;
  showParentalTag?: boolean;
  showYear?: boolean;
  videoData: PodcastData;
}

const VideoInfoRow: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData, showHighlightedText, showParentalTag, showYear } = props;

  const { coincidence, episodesAmount, isNew, isSeries, parentalAge, year } = videoData;

  const formattedVideoDuration: Duration = formatDuration(videoData.duration);

  const parentalText = getParentalAgeText(videoData.parentalAge);

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

  const renderDurationSeasonsText = (): ReactElement | null => {
    if(!isSeries) {
      return (
        <FormattedText
          className={styles.infoRowText}
          injectedTexts={formattedVideoDuration.values}
          textKey={formattedVideoDuration.textKey}/>
      );
    }
    const textKey = episodesAmount === 1 ? "videoDetails-episodesAmount" : "videoDetails-episodesAmountPlural";
    return (
      <FormattedText
        className={styles.infoRowText}
        injectedTexts={[episodesAmount || '']}
        textKey={textKey} />
    );
  };

  const renderYearLabel = (): ReactElement | null => {
    if(!showYear) {
      return null;
    }
    return (
      <Label
        className={styles.infoRowText}
        text={year.toString()} />
    );
  };

  const renderParentalTag = (): ReactElement | null => {
    if(!showParentalTag) {
      return null;
    }

    return  (
      <FormattedText
        className={styles.parentalLabel}
        injectedTexts={[parentalAge]}
        textKey={parentalText}/>
    );
  };

  return (
    <div className={styles.row}>
      { renderHighlightedText() }
      { renderYearLabel() }
      { renderParentalTag() }
      { renderDurationSeasonsText() }
    </div>
  );
};

VideoInfoRow.defaultProps = {
  showHighlightedText: true,
  showParentalTag: true,
  showYear: false
};

export default VideoInfoRow;