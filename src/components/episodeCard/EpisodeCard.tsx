// @Vendors
import React, { useState, ReactElement } from 'react';

// @Constants
import { Duration, EpisodeData } from 'constants/types';
import { BUTTON_MODIFIERS, BUTTON_SIZES } from 'constants/enums';
import { ICON_PLAY } from 'constants/constants';

// @Components
import Button from 'components/button/Button';
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';

// @Helpers
import { formatDuration } from 'utils/dateHelper';

// @Styles
import styles from './EpisodeCard.module.scss';

// @PropTypes
interface PropTypes {
  episodeData: EpisodeData;
  onPressPlay: (episodeId: string) => void;
}

const EpisodeCard: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodeData, onPressPlay } = props;

  const [ hovered, setHovered ] = useState(false);

  const { duration, id, imageSrc } = episodeData;
  const episodeDuration: Duration = formatDuration(duration);

  const handlePressPlay = (): void => {
    onPressPlay(id);
  };

  const renderPlayButton = (): ReactElement | null => {
    if(!hovered) {
      return null;
    }
    return (
      <div className={styles.overlay}>
        <Button
          iconSource={ICON_PLAY}
          modifiers={[BUTTON_MODIFIERS.circle, BUTTON_MODIFIERS.withBorder, BUTTON_MODIFIERS.redContent]}
          onPress={handlePressPlay}
          size={BUTTON_SIZES.big}/>
      </div>
    );
  };

  const renderEpisodeImage = (): ReactElement => {
    return (
      <div
        className={styles.imageContainer}
        onMouseEnter={setHovered.bind(null, true)}
        onMouseLeave={setHovered.bind(null, false)} >
        { renderPlayButton() }
        <img
          src={imageSrc}
          alt="Episode poster" />
      </div>
    );
  };

  return (
    <div
      className={styles.mainContainer}>
      { renderEpisodeImage() }
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