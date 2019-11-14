// @Vendors
import React, { useEffect, useState } from 'react';

// @Styles
import styles from './Topbar.module.scss';

// @Constants
import { TOPBAR_SCROLL_INTERPOLATE_RANGE } from 'constants/constants';

// @Components
import FormattedText from 'components/formattedText/FormattedText';

// @Utils
import { interpolateScroll } from 'utils/calcHelper';

// @Assets
const healinerLogo = require('assets/png/headliner_logo.png');

const Topbar: React.FunctionComponent<{}>  = () => {
  const [scrollHeight, setScrollHeight] = useState(
    interpolateScroll({
      scrollPos: window.scrollY,
      inputRange: TOPBAR_SCROLL_INTERPOLATE_RANGE,
      outputRange: [0, 1]
    })
  );

  useEffect(() => {
    window.onscroll = (): void => {
      setScrollHeight(window.scrollY);
    };
  });

  const topbarOpacity: number = interpolateScroll({
    scrollPos: scrollHeight,
    inputRange: TOPBAR_SCROLL_INTERPOLATE_RANGE,
    outputRange: [0, 1]
  });

  return (
    <div className={styles.body}>
      <div className={styles.background} style={{ opacity: topbarOpacity }} />
      <img
        src={healinerLogo}
        alt="healiner_logo"
        className={styles.logoContainer}
      />
      <div>
        <FormattedText
          className={styles.text}
          textKey="topbar-buttonPlaceholder"
        />
      </div>
    </div>
  );
};

export default Topbar;
