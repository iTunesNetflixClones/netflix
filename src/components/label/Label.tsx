// @Vendors
import React from 'react';

// @Styles
import styles from './Label.module.scss';

// @PropTypes
interface PropTypes {
  className?: string;
  text: string;
}

const Label: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const { className, text } = props;

  const style = className || styles.text;

  return (
    <p className={style}>{text}</p>
  );
};

Label.defaultProps = {
  className: ''
};

export default Label;