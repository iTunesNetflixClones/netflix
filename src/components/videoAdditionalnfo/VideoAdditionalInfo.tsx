// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { VideoData } from 'constants/types';
import { VIDEO_INFO_TEXT_SEPARATOR } from 'constants/constants';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';

// @Styles
import styles from './VideoAdditionalInfo.module.scss';

// @PropTypes
interface PropTypes {
  videoData: VideoData;
}

const VideoAddionalInfo: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData } = props;

  const buildLabelText = (data: Array<string>): string => {
    let text = '';
    data.forEach((textElement: string, index: number) =>
      text = `${text}${textElement}${index < data.length -1 ? VIDEO_INFO_TEXT_SEPARATOR : ''}`
    );
    return text;
  };

  const renderRow = (labelKey: string, data: Array<string>): ReactElement => {
    return(
      <div className={styles.infoRow}>
        <FormattedText
          className={styles.infoRowLabel}
          textKey={labelKey}/>
        <Label
          className={styles.infoRowText}
          text={buildLabelText(data)}/>
      </div>
    );
  };

  return (
    <div className={styles.addionalDataContainer}>
      { renderRow('videoDetails-cast', videoData.cast) }
      { renderRow('videoDetails-genres', videoData.genres) }
      { renderRow('videoDetails-tags', videoData.tags) }
    </div>
  );
};

export default VideoAddionalInfo;