import type { MenuProps } from 'antd'
import type { ISideMenu } from '#/global'
import type { AppDispatch } from '@/stores'
import { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { RootState } from '@/stores'
import { useDispatch, useSelector } from 'react-redux'
import { defaultMenus } from '@/menus'
import { useNavigate, useLocation } from 'react-router-dom'
import { firstCapitalize } from '@/utils/helper'
import { setOpenKey } from '@/stores/menu'
import { filterMenus, getMenuByKey } from '@/menus/utils/helper'
import { addTabs, setActiveKey } from '@/stores/tabs'
import styles from '../index.module.less'
import Logo from '@/assets/images/logo.svg'

function LayoutMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()
  const [menus, setMenus] = useState<ISideMenu[]>([])
  const openKey = useSelector((state: RootState) => state.menu.openKey)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  // 菜单是否收缩
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  const permissions = useSelector((state: RootState) => state.user.permissions)

  // 处理默认展开
  useEffect(() => {
    const { pathname } = location
    const arr = pathname.split('/')
    // 当路由长度大于2时说明不是默认数据总览
    if (arr.length > 2) {
      // 取第一个单词大写为新展开菜单key
      const newOpenKey = firstCapitalize(arr[1])
      if (newOpenKey !== openKey?.[0]) {
        dispatch(setOpenKey([newOpenKey]))
      }
    }
  }, [])

  // 过滤没权限菜单
  useEffect(() => {
    if (permissions.length > 0) {
      const newMenus = filterMenus(defaultMenus, permissions)
      setMenus(newMenus || [])
    }
  }, [permissions])

  /** 
   * 点击菜单
   * @param e - 菜单事件
   */
  const onClick: MenuProps['onClick'] = e => {
    navigate(e.key)
    const newTab = getMenuByKey(menus, permissions, e.key)
    dispatch(setActiveKey(newTab.key))
    dispatch(addTabs(newTab))
  }

  /**
   * 展开/关闭回调
   * @param openKey - 展开键值
   */
  const onOpenChange = (openKey: string[]) => {
    const newOpenKey = openKey.length ? [openKey[openKey.length - 1]] : []
    dispatch(setOpenKey(newOpenKey))
  }

  return (
    <div 
      className={`
        transition-all
        ${styles.menu}
        ${isCollapsed ? styles.menuClose : ''}
        ${isMaximize ? styles.menuNone : ''}
      `}
    >
      <div className={`
        text-white
        flex
        content-center
        px-5
        py-2
        cursor-pointer
        ${isCollapsed ? 'justify-center' : ''}
      `}>
        <img
          src={Logo}
          width={30}
          height={30}
          className="object-contain"
          alt="logo"
        />
        
        <span className={`
          text-white
          ml-3
          text-xl
          font-bold
          truncate
          ${isCollapsed ? 'hidden' : ''}
        `}>
          后台管理系统
        </span>
      </div>
      <Menu
        selectedKeys={[location.pathname]}
        openKeys={openKey}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapsed}
        items={menus}
        onClick={onClick}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default LayoutMenu