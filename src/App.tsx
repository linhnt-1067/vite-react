import { I18nextProvider } from 'react-i18next';
import { ConfigProvider, App as AntdApp } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import i18n from '@/locales/i18n';

import '@/styles/index.css';
import FlashMessage from './components/atoms/FlashMessage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ConfigProvider>
          <AntdApp message={{ maxCount: 1, duration: 3 }}>
            <FlashMessage />
            App
          </AntdApp>
        </ConfigProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
