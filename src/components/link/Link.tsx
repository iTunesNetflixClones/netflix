// @Vendors
import React from 'react';
import classNames from 'classnames';

// @Styles
import styles from './Link.module.scss';

// @Constants
import { LINK_MODIFIERS } from 'constants/enums';

// @PropTypes
interface PropTypes {
  modifiers?: LINK_MODIFIERS[];
  href: string;
  text: string;
}

const Link: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { href, modifiers, text } = props;

  const className = classNames({
    [styles.link]: true,
    [styles.link__large]: modifiers ? modifiers.includes(LINK_MODIFIERS.LARGE) : false
  });

  return (
    <a
      className={className}
      href={href}
      target="blank">
      { text }
    </a>
  );
};

export default Link;