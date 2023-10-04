import { I18nextProvider } from 'react-i18next';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import i18n from '@/locales/i18n';
import '@/styles/index.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ConfigProvider>App</ConfigProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
