// @Vendors
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { Container } from 'reactstrap';

// @Components
import FeaturedVideoHeader from 'components/featuredVideoHeader/FeaturedVideoHeader';
import Modal from 'components/modal/Modal';
import VideoSlider from 'components/videoSlider/VideoSlider';

// @Constants
import { VIDEO_SLIDER_CATEGORIES } from 'constants/constants';

// @Styles
import styles from './VideoOverview.module.scss';

// @Actions
import { enablePlayers } from 'actions/player.actions';

// @Utils
import { formatText } from 'utils/i18n';
import { mapFeaturedPodcast, mapPodcasts, filterByCategory } from 'utils/feedUtils';

const podcastList = mapPodcasts();
const featuredPodcast = mapFeaturedPodcast();
const trendingPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.TRENDING, podcastList);
const entertainmentPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.ENTERTAINMENT, podcastList);
const comedyPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.COMEDY, podcastList);
const techPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.TECHNO, podcastList);
const newsPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.NEWS, podcastList);
const crimePodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.CRIME, podcastList);
const sportsPodcasts = filterByCategory(VIDEO_SLIDER_CATEGORIES.SPORTS, podcastList);

// @PropTypes
interface DispatchProps {
  enablePlayers: () => void;
}

const VideoOverview: React.FunctionComponent<DispatchProps>  = (props: DispatchProps) => {
  const { enablePlayers } = props;

  const [ modalVisible, setModalVisible ] = useState(true);

  const handleCloseModal = (): void => {
    setModalVisible(false);
    enablePlayers();
  };

  return (
    <Container className={styles.mainContainer}>
      <Modal
        isVisible={modalVisible}
        onAcceptModal={handleCloseModal}/>
      <FeaturedVideoHeader
        onPressPlay={(): void => {}}
        onPressMoreInfo={(): void => {}}
        podcastData={featuredPodcast}
      />
      <div className={styles.sliderContainer}>
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="1"
          anchorText={formatText('placeholders-categoryTrending')}
          titleText={formatText('placeholders-categoryTrending')}
          videosList={trendingPodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="2"
          anchorText={formatText('placeholders-categoryEntertainmentShort')}
          titleText={formatText('placeholders-categoryEntertainment')}
          videosList={entertainmentPodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="3"
          anchorText={formatText('placeholders-categoryComedy')}
          titleText={formatText('placeholders-categoryComedy')}
          videosList={comedyPodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="4"
          anchorText={formatText('placeholders-categoryTech')}
          titleText={formatText('placeholders-categoryTech')}
          videosList={techPodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="5"
          anchorText={formatText('placeholders-categoryNews')}
          titleText={formatText('placeholders-categoryNews')}
          videosList={newsPodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="6"
          anchorText={formatText('placeholders-categoryCrime')}
          titleText={formatText('placeholders-categoryCrime')}
          videosList={crimePodcasts} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="7"
          anchorText={formatText('placeholders-categorySport')}
          titleText={formatText('placeholders-categorySport')}
          videosList={sportsPodcasts} />
      </div>
    </Container>
  );
};

const mapStateToProps = (): {} => ({
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({ enablePlayers }, dispatch)
);

export default connect<{}, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoOverview);
