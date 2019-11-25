// @Vendors
import React, { ReactElement } from 'react';
import classNames from 'classnames';

// @Constants
import { PodcastData } from 'constants/types';
import { ICON_CIRCLE } from 'constants/constants';

// @Components
import FooterButton from 'components/footerButton/FooterButton';
import Label from 'components/label/Label';

// @Styles
import styles from './VideoCardOverlay.module.scss';

// @PropTypes
interface PropTypes {
  onPressExpand: () => void;
  playing: boolean;
  videoData: PodcastData;
}

const VideoCardOverlay: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { onPressExpand, videoData } = props;

  const renderTags = (): Array<ReactElement> => (
    videoData.categories.map((tag: string, index: number) => {
      let separator;
      if(!(index === videoData.categories.length - 1)) {
        const separatorClassname = classNames(ICON_CIRCLE, styles.separator);
        separator = (
          <i className={separatorClassname} />
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
      </div>
      <FooterButton
        onPress={onPressExpand}/>
    </div>
  );
};

export default VideoCardOverlay;