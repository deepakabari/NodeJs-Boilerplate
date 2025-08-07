import path from 'path';
import { I18n } from 'i18n';
import { LANGUAGE } from '../constants/constants';

const i18nConfig = new I18n({
  locales: Object.values(LANGUAGE),
  directory: path.join(__dirname, '../locale'),
  defaultLocale: LANGUAGE.ENGLISH
});

export { i18nConfig };
