// @Vendors
import React from 'react';

// @Constants
import { EpisodeData } from '../../constants/types';
import { Duration } from '../../constants/types';

// @Components
import FormattedText from '../formattedText/FormattedText';
import Label from '../label/Label';

// @Helpers
import { formatDuration } from '../../utils/dateHelper';

// @Styles
import styles from './EpisodeCard.module.scss';

// @PropTypes
interface PropTypes {
  episodeData: EpisodeData;
}

const EpisodeCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodeData } = props;

  const episodeDuration: Duration = formatDuration(episodeData.duration);

  return (
    <div className={styles.mainContainer}>
      <img
        src={episodeData.imageSrc}
        alt="Episode poster"/>
      <div className={styles.titleContainer}>
        <FormattedText
          className={styles.titleText}
          injectedTexts={[episodeData.episodeNumber]}
          textKey="videoDetails-episode"/>
        <FormattedText
          className={styles.titleText}
          injectedTexts={episodeDuration.values}
          textKey={episodeDuration.textKey}/>
      </div>
      <Label
        className={styles.descriptionText}
        text={episodeData.description}/>
    </div>
  );
};

export default EpisodeCard;