// @Vendors
import React, { ReactElement, RefObject, useRef, useState } from 'react';

// @Custom hooks
import useOutsideAlerter from 'hooks/ousideClickDetector';

// @Components
import FormattedText from 'components/formattedText/FormattedText';
import Label from 'components/label/Label';

// @Constants
import { ICON_CARET_DOWN } from 'constants/constants';
import { SelectorOption } from 'constants/types';

// @Styles
import styles from './Dropdown.module.scss';

// @PropTypes
interface PropTypes {
  onSelectOption: (option: SelectorOption, index: number) => void;
  options: Array<SelectorOption>;
  placeholder?: string;
  selectedIndex?: number;
}

const Dropdown: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const { options, onSelectOption, placeholder, selectedIndex } = props;

  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  const [ menuVisible, setMenuVisible ] = useState(false);

  const handleSelection = (option: SelectorOption, index: number): void => {
    setMenuVisible(false);
    onSelectOption(option, index);
  };

  const handleClickOutside = (): void => {
    setMenuVisible(false);
  };

  const handleToggleDropdown = (): void => {
    setMenuVisible(!menuVisible);
  };

  useOutsideAlerter(containerRef, handleClickOutside);

  const renderOptions = (): Array<ReactElement> => {
    return options.map((option: SelectorOption, index: number) => (
      <button
        key={option.code}
        className={styles.optionButton}
        onClick={handleSelection.bind(null, option, index)}>
        <FormattedText
          injectedTexts={[option.value]}
          textKey={option.textKey || 'dropdown-defaultKey'}/>
      </button>
    ));
  };

  const renderMenu = (): ReactElement | null => {
    if(!menuVisible) {
      return null;
    }
    return (
      <div
        className={styles.menuContainer}>
        { renderOptions() }
      </div>
    );
  };

  const renderSelectedOption = (availableOptions: Array<SelectorOption>): ReactElement => {
    if(selectedIndex === null || selectedIndex === undefined || !availableOptions[selectedIndex]) {
      return (
        <Label
          className={styles.optionElement}
          text={placeholder || ''}/>
      );
    }
    const selectedOption = availableOptions[selectedIndex];
    const { textKey, value } = selectedOption;
    return (
      <FormattedText
        className={styles.optionElement__inline}
        injectedTexts={[value]}
        textKey={textKey || 'dropdown-defaultKey'}/>
    );
  };

  return (
    <div
      ref={containerRef}
      className={styles.selectorContainer}>
      <button
        onClick={handleToggleDropdown}
        className={styles.selectorMainButton}>
        { renderSelectedOption(options) }
        <i className={ICON_CARET_DOWN}/>
      </button>
      { renderMenu() }
    </div>
  );
};

Dropdown.defaultProps = {
  placeholder:'',
  selectedIndex: -1
};

export default Dropdown;