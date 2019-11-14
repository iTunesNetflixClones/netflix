// @Vendors
import { useEffect, RefObject } from 'react';

const  useOutsideAlerter = (
  ref: RefObject<any>,
  onClickOutside: () => void
): void => {

  const handleClickOutside = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutsideAlerter;