// @Vendors
import React from 'react';

// @Styles
import styles from './Label.module.scss';

type propTypes = {
  className: string,
  text: string
}

const Label = (props: propTypes) => {
  const { className, text } = props;

  const style = `${styles.text} ${className}`;

  return (
    <p className={style}>{text}</p>
  );
}

Label.defaultProps = {
  className: ''
}

export default Label