// @Vendors
import React, { useEffect, useState } from 'react';

// @Styles
import styles from './Topbar.module.scss';

// @Constants
import { TOPBAR_INTERPOLATION_ACCEL } from '../../constants/constants';

// @Components
import FormattedText from '../formattedText/FormattedText';

// @Utils
import { interpolateScroll } from '../../utils/calcHelper';

// @Assets
const healinerLogo = require('../../assets/png/headliner_logo.png');

const Topbar = () => {
  const [scrollHeight, setScrollHeight] = useState(
    interpolateScroll({
      scrollPos: window.scrollY,
      acceleration: TOPBAR_INTERPOLATION_ACCEL
    })
  );

  useEffect(() => {
    window.onscroll = () => {
      setScrollHeight(window.scrollY);
    };
  });

  const topbarOpacity: number = interpolateScroll({
    scrollPos: scrollHeight,
    acceleration: TOPBAR_INTERPOLATION_ACCEL
  });
  console.log(topbarOpacity);

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
