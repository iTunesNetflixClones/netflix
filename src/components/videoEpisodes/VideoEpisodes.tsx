// @Vendors
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

// Constants
import { EpisodeData } from 'constants/types';
import { StoreState } from 'constants/stateTypes';

// @Components
import EpisodeSlider from 'components/episodeSlider/EpisodeSlider';

// @Styles
import styles from './VideoEpisodes.module.scss';

// @Actions
import * as episodeActions from 'actions/episodes.actions';

// @PropTypes
interface OwnProps {
  podcastId: string;
}

interface StateProps {
  episodesData: EpisodeData[];
}

interface DispatchProps {
  getEpisodes: (podcastId: string) => void;
}

type PropTypes = OwnProps & StateProps & DispatchProps;

const VideoEpisodes: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { episodesData, getEpisodes, podcastId } = props;

  useEffect(() => {
    getEpisodes(podcastId);
  }, [podcastId]);

  const handleEpisodePlay = (episodeId: string): void => {
    console.log(episodeId);
  };

  return (
    <div className={styles.mainContainer}>
      <div style={{ width: 300}}>
        <EpisodeSlider
          onPressPlay={handleEpisodePlay}
          episodesList={episodesData}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState): StateProps => ({
  episodesData: state.episodesReducer.episodesData
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({ getEpisodes: episodeActions.getEpisodes }, dispatch)
);

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoEpisodes);