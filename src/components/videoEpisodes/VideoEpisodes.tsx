// @Vendors
import React from 'react';

// Constants
import { PodcastData } from 'constants/types';

// @Components
import EpisodeSlider from 'components/episodeSlider/EpisodeSlider';

// @Styles
import styles from './VideoEpisodes.module.scss';

// @Resources
import epidodesList from 'resources/episodeData';

// @PropTypes
interface PropTypes {
  videoData: PodcastData;
}

const VideoEpisodes: React.FunctionComponent<PropTypes> = () => {
  const handleEpisodePlay = (episodeId: string): void => {
    console.log(episodeId);
  };

  return (
    <div className={styles.mainContainer}>
      <div style={{ width: 300}}>
        <EpisodeSlider
          onPressPlay={handleEpisodePlay}
          episodesList={epidodesList}/>
      </div>
    </div>
  );
};

export default VideoEpisodes;