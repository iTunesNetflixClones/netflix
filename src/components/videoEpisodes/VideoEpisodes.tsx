// @Vendors
import React, { useState } from 'react';

// Constants
import { SelectorOption } from '../../constants/types';

// @Components
import Dropdown from '../dropdown/Dropdown';
import EpisodeSlider from '../episodeSlider/EpisodeSlider';

// @Styles
import styles from './VideoEpisodes.module.scss';

// Resources
import epidodesList from '../../resources/episodeData';

const VideoEpisodes: React.FunctionComponent<{}> = () => {
  const [ selectedSeasonIndex, setSelectedSeasonIndex ] = useState(0);

  const handleSelectSeason = (option: SelectorOption, index: number): void => {
    setSelectedSeasonIndex(index);
  };

  const handleEpisodePlay = (episodeId: string): void => {
    console.log(episodeId);
  };

  return (
    <div className={styles.mainContainer}>
      <Dropdown
        onSelectOption={handleSelectSeason}
        options={[
          { code: '1', value: 1, textKey: 'videoDetails-seasonSelector' },
          { code: '2', value: 2, textKey: 'videoDetails-seasonSelector' },
          { code: '3', value: 3, textKey: 'videoDetails-seasonSelector' },
        ]}
        selectedIndex={selectedSeasonIndex} />
      <div style={{ width: 300}}>
        <EpisodeSlider
          onPressPlay={handleEpisodePlay}
          episodesList={epidodesList}/>
      </div>
    </div>
  );
};

export default VideoEpisodes;