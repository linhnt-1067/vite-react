import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		ns: 'common',
		supportedLngs: ['jp'],
		fallbackLng: 'jp',
		backend: {
			loadPath: 'src/locales/{{lng}}/{{ns}}.json',
		},
		load: 'languageOnly',
		lowerCaseLng: true,
	});

export default i18n;
