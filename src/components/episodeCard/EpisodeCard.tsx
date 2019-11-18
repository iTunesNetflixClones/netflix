// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { Duration, EpisodeData } from 'constants/types';
import { PLAYER_CONTROLS_SIZES } from 'constants/enums';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';
import Link from 'components/link/Link';
import Player from 'components/player/Player';

// @Helpers
import { formatDuration } from 'utils/dateHelper';

// @Styles
import styles from './EpisodeCard.module.scss';
import { formatText } from 'utils/i18n';

// @PropTypes
interface PropTypes {
  episodeData: EpisodeData;
}

const EpisodeCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodeData } = props;

  const { duration, link, name, id, src } = episodeData;
  const episodeDuration: Duration = formatDuration(duration);

  const renderEpisodeImage = (): ReactElement => {
    return (
      <div
        className={styles.imageContainer}>
        <Player
          hoverPlayMode
          loop={false}
          muted={false}
          playerId={id}
          size={PLAYER_CONTROLS_SIZES.small}
          src={src}
          />
      </div>
    );
  };

  return (
    <div
      className={styles.mainContainer}>
      { renderEpisodeImage() }
      <div className={styles.titleContainer}>
        <Label
          className={styles.titleText}
          text={name}/>
        <FormattedText
          className={styles.durationText}
          injectedTexts={episodeDuration.values}
          textKey={episodeDuration.textKey}/>
      </div>
      <Label
        className={styles.descriptionText}
        text={episodeData.description}/>
      <div className={styles.linkRow}>
        <Link
          href={link}
          text={formatText('episodeCard-goToEpisode')}/>
      </div>
    </div>
  );
};

export default EpisodeCard;