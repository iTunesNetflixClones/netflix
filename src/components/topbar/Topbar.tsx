// @Vendors
import React, { useEffect, useState, ReactElement, RefObject } from 'react';
import get from 'lodash/get';

// @Styles
import styles from './Topbar.module.scss';

// @Constants
import { SCROLL_TOPBAR_OFF_SET_CORRECTOR, TOPBAR_SCROLL_INTERPOLATE_RANGE } from 'constants/constants';
import { SliderRef } from 'constants/types';

// @Utils
import { interpolateScroll } from 'utils/calcHelper';

// @Assets
const healinerLogo = require('assets/png/headliner_logo.png');

interface PropTypes {
  anchors?: SliderRef[];
}

const Topbar: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const { anchors } = props;

  const handleClickItem = (ref: RefObject<any>): void => {
    const currentRef = get(ref, 'current', null);
    if(currentRef && currentRef.getBoundingClientRect) {
      const offset = ref.current.getBoundingClientRect().top + window.pageYOffset + SCROLL_TOPBAR_OFF_SET_CORRECTOR;
      window.scrollTo(0, offset);
    }
  };

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

  const buildAnchors = (links?: SliderRef[]): ReactElement | null => {
    if(!links) {
      return null;
    }

    const anchorElements = links.map((anchor: SliderRef) => (
      <li
        className={styles.anchor}
        key={anchor.text}
        onClick={handleClickItem.bind(null, anchor.ref)}>
        { anchor.text}
      </li>
    ));

    return (
      <ul
        className={styles.anchorsContainer}>
        { anchorElements }
      </ul>
    );
  };

  const topbarOpacity: number = interpolateScroll({
    scrollPos: scrollHeight,
    inputRange: TOPBAR_SCROLL_INTERPOLATE_RANGE,
    outputRange: [0, 1]
  });

  return (
    <nav className={styles.body}>
      <div className={styles.background} style={{ opacity: topbarOpacity }} />
      <img
        src={healinerLogo}
        alt="healiner_logo"
        className={styles.logoContainer}
      />
      { buildAnchors(anchors) }
    </nav>
  );
};

export default Topbar;
