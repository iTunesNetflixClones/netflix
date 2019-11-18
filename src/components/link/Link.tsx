// @Vendors
import React from 'react';

// @Styles
import styles from './Link.module.scss';

// @PropTypes
interface PropTypes {
  href: string;
  text: string;
}

const Link: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { href, text } = props;

  return (
    <a
      className={styles.link}
      href={href}>
      { text }
    </a>
  );
};

export default Link;