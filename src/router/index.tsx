import { useEffect } from 'react';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';
import { HashRouter as Router } from 'react-router-dom';
import nprogress from 'nprogress';
import AppPage from './App';
import StaticAntd from '@/utils/staticAntd';

// antd
import { theme, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';

// antd主题
const { defaultAlgorithm, darkAlgorithm } = theme;

// keepalive
import { AliveScope } from 'react-activation';

import { useCommonStore } from '@/hooks/useCommonStore';

function Page() {
  const { i18n } = useTranslation();
  const { theme } = useCommonStore();
  // 获取当前语言
  const currentLanguage = i18n.language;

  // 顶部进度条
  useEffect(() => {
    nprogress.done();

    // 关闭loading
    const firstElement = document.getElementById('first');
    if (firstElement && firstElement.style?.display !== 'none') {
      firstElement.style.display = 'none';
    }

    return () => {
      nprogress.start();
    };
  }, []);

  return (
    <Router>
      <ConfigProvider
        locale={currentLanguage === 'en' ? enUS : zhCN}
        theme={{
          algorithm: [theme === 'dark' ? darkAlgorithm : defaultAlgorithm]
        }}
      >
        <App>
          <StaticAntd />
          <AliveScope>
            <AppPage />
          </AliveScope>
        </App>
      </ConfigProvider>
    </Router>
  );
}

export default Page;