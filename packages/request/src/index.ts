import { message } from '@south/message';
import { getLocalInfo, removeLocalInfo } from '@south/utils';
import axios from 'axios';
import AxiosRequest from './request';

/**
 * 创建请求
 * @param url - 链接地址
 * @param tokenKey - 存token的key值
 */
function creteRequest(url: string, tokenKey: string) {
  return new AxiosRequest({
    baseURL: url,
    timeout: 180 * 1000,
    interceptors: {
      // 接口请求拦截
      requestInterceptors(res) {
        const tokenLocal = getLocalInfo(tokenKey) || '';
        if (res?.headers && tokenLocal) {
          res.headers.Authorization = tokenLocal as string;
        }
        return res;
      },
      // 请求拦截超时
      requestInterceptorsCatch(err) {
        message.error('请求超时！');
        return err;
      },
      // 接口响应拦截
      responseInterceptors(res) {
        const { data } = res;
        // 权限不足
        if (data?.code === 401) {
          const lang = localStorage.getItem('lang');
          const enMsg = 'Insufficient permissions, please log in again!';
          const zhMsg = '权限不足，请重新登录！';
          const msg = lang === 'en' ? enMsg : zhMsg;
          message.error(msg);
          removeLocalInfo(tokenKey);
          console.error('错误信息:', data?.message || msg);

          // 如果不是登录页则刷新页面进登录页
          if (!window.location.href?.includes('/login')) {
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
          return res;
        }

        // 错误处理
        if (data?.code !== 200) {
          handleError(data?.message);
          return res;
        }

        return res;
      },
      responseInterceptorsCatch(err) {
        // 取消重复请求则不报错
        if(axios.isCancel(err)) {
          err.data = err.data || {};
          return err;
        }

        handleError('服务器错误！');
        return err;
      }
    }
  });
}

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error: string, content?: string) => {
  console.error('错误信息:', error);
  message.error({
    content: content || error || '服务器错误',
    key: 'error'
  });
};

export { creteRequest };
export type * from './types';
