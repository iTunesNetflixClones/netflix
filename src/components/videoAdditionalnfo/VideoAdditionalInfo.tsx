// @Vendors
import React, { ReactElement } from 'react';

// @Constants
import { PodcastData } from 'constants/types';
import { VIDEO_INFO_TEXT_SEPARATOR } from 'constants/constants';
import { LINK_MODIFIERS } from 'constants/enums';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';
import Link from 'components/link/Link';

// @Utils
import { formatText } from 'utils/i18n';

// @Styles
import styles from './VideoAdditionalInfo.module.scss';

// @PropTypes
interface PropTypes {
  videoData: PodcastData;
}

const VideoAddionalInfo: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { videoData } = props;

  const { author } = videoData;

  const buildLabelText = (data: Array<string>): string => {
    let text = '';
    data.forEach((textElement: string, index: number) =>
      text = `${text}${textElement}${index < data.length -1 ? VIDEO_INFO_TEXT_SEPARATOR : ''}`
    );
    return text;
  };

  const renderAuthorRow = (): ReactElement => {
    return(
      <div className={styles.infoRow}>
        <FormattedText
          className={styles.infoRowLabel}
          textKey="videoDetails-author"/>
        <Label
          className={styles.infoRowText}
          text={author}/>
      </div>
    );
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
      { renderAuthorRow() }
      { renderRow('videoDetails-genres', videoData.categories) }
      <Link
        href={videoData.website}
        modifiers={[LINK_MODIFIERS.LARGE]}
        text={formatText('videoDetails-visitWebsite')}/>
    </div>
  );
};

export default VideoAddionalInfo;