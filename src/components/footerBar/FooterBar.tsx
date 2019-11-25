// @Vendors
import React, { ReactElement, useState } from 'react';
import classNames from 'classnames';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Link from 'components/link/Link';

// @Constants
import {
  HEADLINER_LINKS,
  ICON_FACEBOOK,
  ICON_INSTAGRAM,
  ICON_YOUTUBE,
  ICON_TWITTER,
  SCREEN_TABLET_MIN_WIDTH
} from 'constants/constants';

// @Hooks
import useResizeDetector from 'hooks/resizeDetector';

// @Utils
import { formatText } from 'utils/i18n';

// @Styles
import styles from './FooterBar.module.scss';

// @PropTypes

const FooterBar: React.FunctionComponent<{}> = () => {
  const checkAppMode = (): boolean => window.innerWidth < SCREEN_TABLET_MIN_WIDTH;

  const [ appMode, setAppMode ] = useState(checkAppMode());

  const onChangeWindowDimensions = (): void => {
    setAppMode(checkAppMode());
  };

  useResizeDetector(onChangeWindowDimensions);

  const renderLink = (icon: string, href: string): ReactElement => {
    const className = classNames(icon, styles.link);
    return (
      <a
        href={href}
        target="blank">
        <i className={className}/>
      </a>
    );
  };

  const renderText = (): ReactElement => {
    const containerClassname = classNames({
      [styles.textWrapper]: true,
      [styles.textWrapper__app]: appMode
    });

    return (
      <div className={containerClassname}>
        <FormattedText
          className={styles.getProText}
          textKey="footerBar-getPro"/>
        <Link
          href={HEADLINER_LINKS.getPro}
          text={formatText('footerBar-getProLink')}/>
      </div>
    );
  };

  const linkContainerClassname = classNames({
    [styles.linkContainer]: true,
    [styles.linkContainer__app]: appMode
  });

  return (
    <div className={styles.container}>
      <div className={linkContainerClassname}>
        { renderLink(ICON_TWITTER, HEADLINER_LINKS.twitter) }
        { renderLink(ICON_YOUTUBE, HEADLINER_LINKS.youtube) }
        { renderLink(ICON_INSTAGRAM, HEADLINER_LINKS.instagram) }
        { renderLink(ICON_FACEBOOK, HEADLINER_LINKS.facebook) }
      </div>
      { renderText() }
    </div>
  );
};

export default FooterBar;