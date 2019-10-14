// @Vendors
import React from 'react';

// @Styles
import styles from './Tag.module.scss';

// @Components
import FormattedText from '../formattedText/FormattedText';

type propTypes = {
  injectedTexts: Array<any>;
  textKey: string;
};

const Tag = (props: propTypes) => {
  const { injectedTexts, textKey } = props;

  return (
    <div className={styles.body}>
      <FormattedText
        className={styles.text}
        injectedTexts={injectedTexts}
        textKey={textKey}
      />
    </div>
  );
};

Tag.defaultProps = {
  injectedTexts: []
};

export default Tag;
