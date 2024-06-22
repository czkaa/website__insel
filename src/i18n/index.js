import { createI18n } from 'vue-i18n';
import en from './locales/en.json'; // <--- add this
import de from './locales/de.json'; // <--- add this

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true, // <--- add this
  messages: { en, de },
});
