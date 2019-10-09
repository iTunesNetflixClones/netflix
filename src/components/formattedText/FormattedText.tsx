// @Vendors
import React from 'react';

// @Utils
import { formatText } from '../../utils/i18n';

type props = {
  className: string;
  injectedTexts: Array<any>;
  styles: Object;
  textKey: string;
};

const FormattedText = (props: props) => (
  <span className={props.className} style={props.styles}>
    {formatText(props.textKey, props.injectedTexts)}
  </span>
);

FormattedText.defaultProps = {
  className: '',
  injectedTexts: [],
  styles: null
};

export default FormattedText;
