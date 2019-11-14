// @Vendors
import React from 'react';

// @Styles
import styles from './Modal.module.scss';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import HeadilnerButton from 'components/headlinerButton/HeadlinerButton';

// @Assets
const micLogo = require('assets/png/mic_logo.png');

// @PropTypes
interface PropTypes {
  isVisible: boolean;
  onAcceptModal: () => void;
}

const Modal: React.FunctionComponent<PropTypes>  = (props: PropTypes) => {
  const { isVisible, onAcceptModal } = props;

  if(!isVisible) {
    return (
      <div />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
          <img
            className={styles.logoImg}
            src={micLogo}
            alt="healiner microphone"/>
          <p className={styles.textWrapper}>
            <FormattedText
              className={styles.welcomeText}
              textKey="introModal-welcome"/>
            <FormattedText
              textKey="introModal-modalText"/>
          </p>
          <HeadilnerButton
            onClick={onAcceptModal}
            textKey="introModal-buttonText" />
        </div>
      </div>
    </div>
  );
};

export default Modal;