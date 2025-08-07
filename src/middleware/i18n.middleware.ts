import { Request, Response, NextFunction } from 'express';
import { i18nConfig } from '../config/i18n.config';
import { LANGUAGE } from '../constants/constants';

export const i18nInit = i18nConfig.init.bind(i18nConfig);

export const setLanguage = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { lang = LANGUAGE.ENGLISH }
  } = req;

  res.setLocale(lang as string);

  return next();
};

const i18nMiddleware = [i18nInit, setLanguage];

export default i18nMiddleware;
