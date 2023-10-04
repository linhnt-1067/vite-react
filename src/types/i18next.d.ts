import 'i18next';
import common from '@/locales/jp/common.json';
import messages from '@/locales/jp/messages.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      messages: typeof messages;
    };
  }
}
