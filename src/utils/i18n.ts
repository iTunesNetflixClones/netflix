// @Vendors
import get from 'lodash/get';

// @Config
import { currentLang } from '../config/settings';

// @Languajes
import * as languages from '../language/index';

// @Constants
import {
  I18_DEFAULT_TRANSLATION,
  I18_KEY_SEPARATOR,
  I18N_REPLACEMENT_WILDCARD
} from '../constants/constants';

export const formatText = (
  key: string = '',
  replacements: Array<any> = []
): string => {
  const lang: Object = get(languages, `${currentLang}`, {});
  const splittedKey: Array<string> = key.split(I18_KEY_SEPARATOR);
  if (splittedKey.length !== 2) {
    return I18_DEFAULT_TRANSLATION;
  }
  let translation: string = get(
    lang,
    `${splittedKey[0]}.${splittedKey[1]}`,
    I18_DEFAULT_TRANSLATION
  );
  replacements.forEach(replacement => {
    translation = translation.replace(I18N_REPLACEMENT_WILDCARD, replacement);
  });
  return translation;
};
