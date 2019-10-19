// @Vendors
import React, { useState } from 'react';

// Constants
import { SelectorOption, EpisodeData } from '../../constants/types';

// @Components
import Dropdown from '../dropdown/Dropdown';
import EpisodeSlider from '../episodeSlider/EpisodeSlider';

// @Styles
import styles from './VideoEpisodes.module.scss';

// TODO: Remove mock data when integration happens
const mockEpisodesList: Array<EpisodeData> = [];
const mockEpisodeData = {
  id: '1',
  description: 'The show is set in the fictional town of Springfield and parodies American culture and society, television, and the human condition.',
  duration: 60 * 1000 * 25,
  episodeNumber: 1,
  imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKta37jTH1Z0HKvP0NZL-CCZiZSHFVu4j24kucF5jnFk2uCSme',
  videoSrc: 'https://www.youtube.com/embed/xXEhIL4gj5o?autoplay=1'
};
for(let i = 0; i <= 13; i++) {
  mockEpisodesList.push({ ...mockEpisodeData, id: i.toString(), episodeNumber: i + 1 });
}

const VideoEpisodes: React.FunctionComponent<{}> = () => {
  const [ selectedSeasonIndex, setSelectedSeasonIndex ] = useState(0);

  const handleSelectSeason = (option: SelectorOption, index: number): void => {
    setSelectedSeasonIndex(index);
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
          episodesList={mockEpisodesList}/>
      </div>
    </div>
  );
};

export default VideoEpisodes;