// @Vendors
import React from 'react';

// @Utils
import { formatText } from 'utils/i18n';

// @PropTypes
interface PropTypes {
  className?: string;
  injectedTexts?: Array<string | number>;
  inlineStyles?: Record<string, any>;
  textKey: string;
}

const FormattedText: React.FunctionComponent<PropTypes>  = (props: PropTypes) => (
  <span className={props.className} style={props.inlineStyles}>
    {formatText(props.textKey, props.injectedTexts)}
  </span>
);

FormattedText.defaultProps = {
  className: '',
  injectedTexts: [],
  inlineStyles: {}
};

export default FormattedText;
