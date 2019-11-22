// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { VIDEO_OVERLAY_SEPARATOR_CHAR } from 'constants/constants';
import { PodcastData } from '../../constants/types';

// @Components
import FooterButton from 'components/footerButton/FooterButton';
import Label from 'components/label/Label';
import Link from 'components/link/Link';

// @Styles
import styles from './VideoCardOverlay.module.scss';

// @Utils
import { formatText } from 'utils/i18n';

// @PropTypes
interface PropTypes {
  onPressExpand: () => void;
  onPressPlay: () => void;
  playing: boolean;
  videoData: PodcastData;
}

const VideoCardOverlay: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressExpand, videoData } = props;

  const renderTags = (): Array<ReactElement> => (
    videoData.categories.map((tag: string, index: number) => {
      let separator;
      if(!(index === videoData.categories.length - 1)) {
        separator = (
          <Label
            className={styles.separator}
            text={VIDEO_OVERLAY_SEPARATOR_CHAR} />
        );
      }
      return (
        <div
          className={styles.tagsRow}
          key={tag}>
          <Label
            className={styles.tag}
            text={tag} />
          {separator}
        </div>
      );
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <Label
          className={styles.titleText}
          text={videoData.title}/>
        <div >
          { renderTags() }
        </div>
        <Link
          href="#" // TODO: Define where link will be obtained
          text={formatText('videoCard-latestEpisode')}/>
      </div>
      <FooterButton
        onPress={onPressExpand}/>
    </div>
  );
};

export default VideoCardOverlay;