export default defineI18nConfig(() => ({
  // 👇 Use Vue I18n's Composition API
  legacy: false,
  locale: 'en', // Idioma padrão
  fallbackLocale: 'en', // Idioma de fallback
  messages: {
    en: {
      welcome: 'Welcome',
      home: 'Home',
    },
    lo: {
      welcome: 'ຍິນດີຕ້ອນຮັບ',
      home: 'ໜ້າຫຼັກ',
    },
  },
  datetimeFormats: {
    lo: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
  },
}));
