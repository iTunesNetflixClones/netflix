// @Vendors
import React, { useState, useEffect, ReactElement } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { Container } from 'reactstrap';

// @Components
import FeaturedVideoHeader from 'components/featuredVideoHeader/FeaturedVideoHeader';
import Modal from 'components/modal/Modal';
import VideoSlider from 'components/videoSlider/VideoSlider';

// @Constants
import { StoreState } from 'constants/stateTypes';
import { PodcastData, PodcastEntry } from 'constants/types';

// @Styles
import styles from './VideoOverview.module.scss';

// @Actions
import { enablePlayers } from 'actions/player.actions';
import { getFeaturedPodcastData, getSlidersData } from 'actions/podcasts.actions';
import { goToFeaturedPoscast } from 'actions/slider.actions';

// @Utils
import { formatText } from 'utils/i18n';
import { getDataElement } from 'utils/commonUtils';

// @PropTypes
interface StateProps {
  featuredPodcastData?: PodcastData;
  slidersData: PodcastEntry[];
}

interface DispatchProps {
  enablePlayers: () => void;
  getFeaturedPodcastData: () => void;
  getSlidersData: () => void;
  goToFeaturedPoscast: (podcastId: string) => void;
}

type PropTypes = StateProps & DispatchProps;

const VideoOverview: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const {
    enablePlayers,
    featuredPodcastData,
    getFeaturedPodcastData,
    getSlidersData,
    goToFeaturedPoscast,
    slidersData
  } = props;

  const [ modalVisible, setModalVisible ] = useState(true);

  useEffect(() => {
    getFeaturedPodcastData();
    getSlidersData();
  }, [getFeaturedPodcastData, getSlidersData]);

  const handleCloseModal = (): void => {
    setModalVisible(false);
    enablePlayers();
  };

  const handleClickMoreInfo = (): void => {
    const featuredPodcastId = getDataElement(featuredPodcastData, 'id', '');
    goToFeaturedPoscast(featuredPodcastId);
  };

  const renderFeaturedPodcast = (): ReactElement | null => {
    if(!featuredPodcastData) {
      return null;
    }

    return (
      <FeaturedVideoHeader
        onPressMoreInfo={handleClickMoreInfo}
        podcastData={featuredPodcastData}
      />
    );
  };

  const renderVideoSliders = (data: PodcastEntry[]): ReactElement => {
    return (
      <div className={styles.sliderContainer}>
        { data.map((slider: PodcastEntry): ReactElement => (
          <VideoSlider
            key={slider.sliderId}
            onPressLike={(): void => {}}
            onPressUnlike={(): void => {}}
            sliderId={slider.sliderId}
            anchorText={formatText(slider.anchorTextKey)}
            titleText={formatText(slider.sliderTitleKey)}
            videosList={slider.podcastsData} />
        ))}
      </div>
    );
  };

  return (
    <Container className={styles.mainContainer}>
      <Modal
        isVisible={modalVisible}
        onAcceptModal={handleCloseModal}/>
      { renderFeaturedPodcast() }
      { renderVideoSliders(slidersData) }
    </Container>
  );
};

const mapStateToProps = (state: StoreState): StateProps => ({
  featuredPodcastData: state.podcastsReducer.featuredPodcastData,
  slidersData: state.podcastsReducer.slidersData
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({
    enablePlayers,
    getFeaturedPodcastData,
    getSlidersData,
    goToFeaturedPoscast
  }, dispatch)
);

export default connect<{}, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoOverview);
