// @Vendors
import React, { useEffect, useState, ReactElement, RefObject } from 'react';
import { Col } from 'reactstrap';
import classNames from 'classnames';

// @Styles
import styles from './Topbar.module.scss';

// @Constants
import { SCREEN_TABLET_MIN_WIDTH, TOPBAR_SCROLL_INTERPOLATE_RANGE } from 'constants/constants';
import { SliderRef } from 'constants/types';

// @Utils
import { interpolateScroll } from 'utils/calcHelper';
import { scrollToRef } from 'utils/layoutHelper';

// @Hooks
import useResizeDetector from 'hooks/resizeDetector';

// @Assets
import hamburger from 'assets/png/hamburger.png';
import headlinerLogo from 'assets/png/headliner_logo.png';
import headlinerLogoMini from 'assets/png/headliner_logo_mini.png';

interface PropTypes {
  anchors?: SliderRef[];
}

const Topbar: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const { anchors } = props;

  const checkAppMode = (): boolean => window.innerWidth < SCREEN_TABLET_MIN_WIDTH;

  const [ appMode, setAppMode ] = useState(checkAppMode());
  const [ menuVisible, setMenuVisible ] = useState(false);

  const handleClickItem = (ref: RefObject<any>): void => {
    setMenuVisible(false);
    scrollToRef(ref);
  };

  const [scrollHeight, setScrollHeight] = useState(
    interpolateScroll({
      scrollPos: window.scrollY,
      inputRange: TOPBAR_SCROLL_INTERPOLATE_RANGE,
      outputRange: [0, 1]
    })
  );

  const revalidateAppMode = (): void => {
    setAppMode(checkAppMode());
  };

  useEffect(() => {
    window.onscroll = (): void => {
      setScrollHeight(window.scrollY);
    };
  });

  useResizeDetector(revalidateAppMode);

  const handleToggleMoreOptionsMemu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const getLogo = (): string => (
    appMode ? headlinerLogoMini : headlinerLogo
  );

  const buildAnchors = (links?: SliderRef[], menuMode?: boolean): ReactElement[] | null => {
    if(!links) {
      return null;
    }

    const buttonClassName = classNames({
      [styles.anchor]: true,
      [styles.anchor__menuItem]: menuMode
    });

    return links.map((anchor: SliderRef) => (
      <button
        className={buttonClassName}
        key={anchor.text}
        onClick={handleClickItem.bind(null, anchor.ref)}>
        { anchor.text}
      </button>
    ));
  };

  const renderSectionSelector = (): ReactElement | ReactElement[] | null => {
    if(appMode) {
      return (
        <button
          className={styles.moreOptionsMenuButton}
          onClick={handleToggleMoreOptionsMemu}>
          <img
            alt="More options menu"
            src={hamburger}/>
        </button>
      );
    }

    return buildAnchors(anchors);
  };

  const renderSelectorMenu = (): ReactElement | null => {
    if(!menuVisible) {
      return null;
    }

    const closeIconClassName = classNames({
      'fa fa-times': true,
      [styles.closeIcon]: true,
    });

    return (
      <div className={styles.moreOptionsMenu}>
        <button
          className={styles.closeButton}
          onClick={handleToggleMoreOptionsMemu} >
          <i className={closeIconClassName}/>
        </button>
        { buildAnchors(anchors, true) }
      </div>
    );
  };

  const topbarOpacity: number = interpolateScroll({
    scrollPos: scrollHeight,
    inputRange: TOPBAR_SCROLL_INTERPOLATE_RANGE,
    outputRange: [0, 1]
  });

  return (
    <nav className={styles.body}>
      <Col className={styles.logoContainer} sm="4" md="2">
        <img
          src={getLogo()}
          alt="healiner_logo"
          className={styles.logoContainer}
        />
      </Col>
      <Col className={styles.anchorsContainer} >
        { renderSectionSelector() }
      </Col>
      <div className={styles.background} style={{ opacity: topbarOpacity }} />
      { renderSelectorMenu() }
    </nav>
  );
};

export default Topbar;
