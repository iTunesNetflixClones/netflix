// @Vendors
import React, { useState } from 'react';

// Constants
import { SelectorOption, PodcastData } from 'constants/types';

// @Components
import Dropdown from 'components/dropdown/Dropdown';
import EpisodeSlider from 'components/episodeSlider/EpisodeSlider';

// @Styles
import styles from './VideoEpisodes.module.scss';

// @Resources
import epidodesList from 'resources/episodeData';

// @PropTypes
interface PropTypes {
  videoData: PodcastData;
}

const VideoEpisodes: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData } = props;

  const { seasonsAmount } = videoData;

  const [ selectedSeasonIndex, setSelectedSeasonIndex ] = useState(0);

  const handleSelectSeason = (option: SelectorOption, index: number): void => {
    setSelectedSeasonIndex(index);
  };

  const handleEpisodePlay = (episodeId: string): void => {
    console.log(episodeId);
  };

  const buildSeasonsOptions = (): Array<SelectorOption> => {
    const seasonsOptions: Array<SelectorOption> = [];
    if(seasonsAmount) {
      for(let i = 0; i < seasonsAmount; i++) {
        const season = i + 1;
        seasonsOptions.push({
          code: season.toString(),
          value: season,
          textKey: 'videoDetails-seasonSelector'
        });
      }
    }
    return seasonsOptions;
  };

  return (
    <div className={styles.mainContainer}>
      <Dropdown
        onSelectOption={handleSelectSeason}
        options={buildSeasonsOptions()}
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