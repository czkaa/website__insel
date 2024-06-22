import i18n from '@/i18n';

const Trans = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  },

  isLocaleSupported(locale) {
    // <--- 1
    return Trans.supportedLocales.includes(locale);
  },

  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale;
    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale());
    }
    await Trans.switchLanguage(paramLocale);
    return next();
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }
    const userPreferredLocale = Trans.getUserLocale();
    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }
    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return Trans.defaultLocale;
  },

  getUserLocale() {
    // <--- 2
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale;
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0],
    };
  },

  getPersistedLocale() {
    // <--- 3
    const persistedLocale = localStorage.getItem('user-locale');
    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    } else {
      return null;
    }
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',');
  },
  async switchLanguage(newLocale) {
    Trans.current_locale = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale);
    localStorage.setItem('user-locale', newLocale); // <--- add this
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params,
      },
    };
  },
  get currentLocale() {
    return i18n.global.locale.value;
  },
};
export default Trans;
