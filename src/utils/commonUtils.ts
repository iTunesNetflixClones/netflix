// @Vendors
import get from 'lodash/get';

export const getDataElement = (data: object | null | undefined, path: string, defaultVal: any): any => {
  const dataElement = get(data, path, null);
  return (dataElement === null || dataElement === undefined) ? defaultVal : dataElement;
};
