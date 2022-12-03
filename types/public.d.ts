import type { SubMenuType } from 'antd/lib/menu/hooks/useItems'
import type { ColumnsType } from 'antd/lib/table'
import type { Dayjs } from 'dayjs'

// 区间值
type EventValue<T> = T | null
export type RangeValue<T> = [EventValue<T>, EventValue<T>] | null

// 基础类型
export type IBasicData = string | number | boolean

// 数组
export type IArrayData = string[] | number[] | boolean[]

// 对象
type IObject = Record<string, IBasicData | IArrayData | IEmptyData | object | object[]>
export type IObjectData = object | object[] | IObject

// 时间
export type IDateData = Dayjs | RangeValue<Dayjs>

// 空值
export type IEmptyData = null | undefined

// 唯一值
export type ISymbolData = symbol | symbol[]

// 全部数据类型
export type IAllDataType = IBasicData | IArrayData | IEmptyData | IObjectData | ISymbolData | IDateData

// 接口响应数据
export interface IServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}
export interface IPageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}

// 分页表格响应数据
export interface IPaginationData {
  page?: number;
  pageSize?: number;
}

// 侧边菜单
export interface ISideMenu extends Omit<SubMenuType, 'children' | 'label' | 'icon'> {
  label: string;
  key: string;
  icon?: React.ReactNode | string;
  rule?: string; // 路由权限
  nav?: string[]; // 面包屑路径
  children?: ISideMenu[];
}

// 页面权限
export interface IPagePermission {
  page?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
  [key: string]: boolean;
}

// 表格列数据
export type ITableColumn<T = object> = ColumnsType<T>

// 表格操作
export type ITableOptions<T = object> = (value: unknown, record: T, index?: number) => JSX.Element