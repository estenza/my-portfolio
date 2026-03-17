const i18nConfig = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

module.exports = i18nConfig;
