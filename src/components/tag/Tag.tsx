// @Vendors
import React from 'react';

// @Styles
import styles from './Tag.module.scss';

// @Components
import FormattedText from '../formattedText/FormattedText';

// @PropTypes
interface PropTypes {
  textKey: string;
  injectedTexts: Array<string | number>;
}

const Tag: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
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
