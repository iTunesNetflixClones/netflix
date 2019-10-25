// @Vendors
import { useEffect } from "react";

const  useResizeDetector = (onResize: () => void, propCheck?: Array<any>): any => (
  useEffect(() => {
    window.addEventListener('resize', onResize);

    return (): void => {
      window.removeEventListener('resize', onResize);
    };
  }, [propCheck, onResize])
);

export default useResizeDetector;