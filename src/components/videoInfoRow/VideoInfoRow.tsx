// @Vendors
import React, { ReactElement } from 'react';

// @Styles
import styles from './VideoInfoRow.module.scss';

// @Components
import FormattedText from '../formattedText/FormattedText';
import Label from '../label/Label';

// @Helpers
import { Duration, formatDuration } from '../../utils/dateHelper';
import { getParentalAgeText } from '../../utils/miscHelper';

// @Constants
import { VideoData } from '../../constants/types';

// @PropTypes
interface PropTypes {
  showYear?: boolean;
  videoData: VideoData;
}

const VideoInfoRow: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData, showYear } = props;

  const { coincidence, isNew, isSeries, seasonsAmount, year } = videoData;

  const formattedVideoDuration: Duration = formatDuration(videoData.duration);

  const parentalText = getParentalAgeText(videoData.parentalAge);

  const renderHighlightedText = (): ReactElement => {
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
    const textKey = seasonsAmount === 1 ? "videoDetails-seasonsAmount" : "videoDetails-seasonsAmountPlural";
    return (
      <FormattedText
        className={styles.infoRowText}
        injectedTexts={[seasonsAmount || '']}
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

  return (
    <div className={styles.row}>
      { renderHighlightedText() }
      { renderYearLabel() }
      <FormattedText
        className={styles.parentalLabel}
        injectedTexts={[videoData.parentalAge]}
        textKey={parentalText}/>
      { renderDurationSeasonsText() }
    </div>
  );
};

VideoInfoRow.defaultProps = {
  showYear: false
};

export default VideoInfoRow;