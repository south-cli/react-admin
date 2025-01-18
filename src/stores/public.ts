import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ThemeType = 'dark' | 'light'

interface PublicState {
  theme: ThemeType; // 主题
  isFullscreen: boolean; // 是否全屏
  isRefresh: boolean; // 重新加载
  isRefreshPage: boolean; // 重新加载页面
  /** 设置主题 */
  setThemeValue: (theme: ThemeType) => void;
  /** 设置全屏 */
  setFullscreen: (isFullscreen: boolean) => void;
  /** 设置重新加载 */
  setRefresh: (isRefresh: boolean) => void;
  /** 设置重新加载页面 */
  setRefreshPage: (isRefreshPage: boolean) => void;
}

export const usePublicStore = create<PublicState>()(
  devtools(
    (set) => ({
      theme: 'light',
      isFullscreen: false,
      isRefresh: false,
      isRefreshPage: false,
      setThemeValue: (theme: ThemeType) => set({ theme }),
      setFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
      setRefresh: (isRefresh: boolean) => set({ isRefresh }),
      setRefreshPage: (isRefreshPage: boolean) => set({ isRefreshPage })
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
      name: 'publicStore'
    }
  )
);
