const get = (object, path) => {
  if (typeof object === 'object' && path) {
    return path
      .split(/[\.\["'\]]/) // eslint-disable-line
      .filter(Boolean)
      .reduce((acc, current) => acc && acc[current], object);
  }
  return object;
};

const i18nOptions = {
  locale: 'en-US',
  fallbackLocale: 'en-US',
  languages: {},
};

/**
 * Register Languages
 *
 * @param {*} languages - languages
 */
const register = (languages) => {
  Object.assign(i18nOptions.languages, languages);
};

/**
 * Register Language
 *
 * @param {*} locale - locale
 * @param {*} values - values
 */
const registerLanguage = (locale, values) => {
  Object.assign(i18nOptions.languages, {
    [locale]: values,
  });
};

/**
 * Use Locale
 *
 * @param {*} l - locale
 */
const useLocale = (l) => {
  i18nOptions.locale = l;
};
/**
 * Use Fallback Locale
 *
 * @param {*} l - fallbackLocale
 */
const useFallbackLocale = (l) => {
  i18nOptions.fallbackLocale = l;
};

/**
 * t
 *
 * @param {*} key - key
 * @param {*} args - args
 */
const t = (key, args = {}) => {
  const {
    locale,
    fallbackLocale,
    languages,
  } = i18nOptions;

  let value = get(languages, `${locale}.${key}`);

  if (value === undefined) {
    value = get(languages, `${fallbackLocale}.${key}`);
  }

  if (value === undefined) {
    value = `Missing ${locale}.${key}`;
  }

  if (args) {
    const keys = Object.keys(args);
    keys.forEach((argKey) => {
      const argValue = args[argKey];
      value = value.replace(`__${argKey}__`, argValue);
    });
  }
  return value;
};

const I18n = {
  i18nOptions,
  register,
  registerLanguage,
  useLocale,
  useFallbackLocale,
  t,
};

export {
  I18n as default,
  t,
};
