// @Vendors
import React, { ReactElement, RefObject, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';

// @Styles
import styles from './VideoSlider.module.scss';

// @Constants
import { PodcastData } from 'constants/types';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';
import VideoSliderRow from 'components/videoSliderRow/VideoSliderRow';

// @Actions
import { registerSlider, unregisterSlider } from 'actions/slider.actions';

// @PropTypes
interface OwnProps {
  onPlayVideo: (videoId: string) => any;
  onPressLike: (videoId: string) => any;
  onPressUnlike: (videoId: string) => any;
  sliderId: string;
  titleKey?: string;
  anchorText: string;
  titleText?: string;
  videosList: Array<PodcastData>;
}

interface DispatchProps {
  connectSlider: (sliderId: string, text: string, ref: RefObject<any>) => void;
  disconnectSlider: (sliderId: string) => void;
}

type PropTypes = OwnProps & DispatchProps;

const VideoSlider: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    anchorText,
    connectSlider,
    disconnectSlider,
    onPlayVideo,
    onPressLike,
    onPressUnlike,
    sliderId,
    titleKey,
    titleText,
    videosList
  } = props;

  const sliderRef = useRef(null);

  useEffect(() => {
    connectSlider(sliderId, anchorText, sliderRef);

    return (): void => {
      disconnectSlider(sliderId);
    };
  }, [anchorText, connectSlider, disconnectSlider, sliderId, sliderRef]);

  const renderTitle = (): ReactElement | null => {
    if(titleKey) {
      return (
        <FormattedText
          className={styles.titleText}
          textKey={titleKey}/>
      );
    }
    if(titleText) {
      return (
        <Label
          className={styles.titleText}
          text={titleText}/>
      );
    }
    return null;
  };

  return (
    <div
      ref={sliderRef}
      className={styles.mainContainer}>
      { renderTitle() }
      <VideoSliderRow
        onPlayVideo={onPlayVideo}
        onPressLike={onPressLike}
        onPressUnlike={onPressUnlike}
        sliderId={sliderId}
        videosList={videosList} />
    </div>
  );
};

VideoSlider.defaultProps = {
  titleKey: '',
  titleText: ''
};

const mapStateToProps = (): {} => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => (
  bindActionCreators({
    connectSlider: registerSlider,
    disconnectSlider: unregisterSlider
  }, dispatch)
);

export default connect<{}, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(VideoSlider);