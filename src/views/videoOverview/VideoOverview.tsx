// @Vendors
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

// @Components
import FeaturedVideoHeader from 'components/featuredVideoHeader/FeaturedVideoHeader';
import Modal from 'components/modal/Modal';
import VideoSlider from 'components/videoSlider/VideoSlider';

// @Styles
import styles from './VideoOverview.module.scss';

// @Actions
import { enablePlayers } from 'actions/player.actions';

// @Utils
import { formatText } from 'utils/i18n';

// @Mock data
import videosList from 'resources/videoData';

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
    <div className={styles.mainContainer}>
    <Modal
      isVisible={modalVisible}
      onAcceptModal={handleCloseModal}/>
      <FeaturedVideoHeader
        onPressPlay={(): void => {}}
        onPressList={(): void => {}}
        onPressMoreInfo={(): void => {}}
        videoData={videosList[1]}
      />
      <div className={styles.sliderContainer}>
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="1"
          titleText={formatText('placeholders-categoryTrending')}
          videosList={videosList} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="2"
          titleText={formatText('placeholders-categoryEntertainment')}
          videosList={videosList} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="3"
          titleText={formatText('placeholders-categoryComedy')}
          videosList={videosList} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="4"
          titleText={formatText('placeholders-categoryTech')}
          videosList={videosList} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="5"
          titleText={formatText('placeholders-categoryCrime')}
          videosList={videosList} />
        <VideoSlider
          onPlayVideo={(): void => {}}
          onPressLike={(): void => {}}
          onPressMyList={(): void => {}}
          onPressUnlike={(): void => {}}
          sliderId="6"
          titleText={formatText('placeholders-categoryNews')}
          videosList={videosList} />
      </div>
    </div>
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
